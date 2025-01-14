/**
  * MIT License
  *
  * Copyright (c) 2024 Paul Willems <paul.willems@gmail.com>
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in all
  * copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  */

const client = require('./activecaptain_client')
const formatterUtilities = require('./formatter_utilities')
const positionUtils = require('./position_utilities')
const loadingCache = require('@inventivetalent/loading-cache')
const time = require('@inventivetalent/time')

module.exports = function (app) {
  const plugin = {
    id: 'signalk-activecaptain-resources',
    name: 'Garmin Active Captain Resources',
    description: 'Provides points of interest from Garmin Active Captain API as SignalK resources'
  }

  const sourceConfig = new Map()

  plugin.start = function (options) {
    formatterUtilities.helpers()

    const poiTypes = []

    if (options.includeAnchorage) {
      poiTypes.push('anchorage')
    }
    if (options.includeHazard) {
      poiTypes.push('hazard')
    }
    if (options.includeMarina) {
      poiTypes.push('marina')
    }
    if (options.includeLocalKnowledge) {
      poiTypes.push('localKnowledge')
    }
    if (options.includeNavigational) {
      poiTypes.push('navigational')
    }
    if (options.includeBoatRamp) {
      poiTypes.push('boatRamp')
    }
    if (options.includeBusiness) {
      poiTypes.push('business')
    }
    if (options.includeInlet) {
      poiTypes.push('inlet')
    }
    if (options.includeLock) {
      poiTypes.push('lock')
    }
    if (options.includeDam) {
      poiTypes.push('dam')
    }
    if (options.includeFerry) {
      poiTypes.push('ferry')
    }
    if (options.includeAirport) {
      poiTypes.push('airport')
    }
    if (options.includeBridge) {
      poiTypes.push('bridge')
    }

    setupForPointsOfInterest(poiTypes, options.cachingDurationMinutes)

    registerAsNoteResourcesProvider()
  }

  plugin.stop = function () {
    for (const struct of sourceConfig.values()) {
      struct.detailsCache.end()
    }
  }

  plugin.schema = {
    title: plugin.name,
    description: plugin.description,
    type: 'object',
    required: ['cachingDurationMinutes'],
    properties: {
      includeAnchorage: {
        type: 'boolean',
        title: 'Include anchorages',
        default: true
      },
      includeHazard: {
        type: 'boolean',
        title: 'Include hazards',
        default: true
      },
      includeMarina: {
        type: 'boolean',
        title: 'Include marinas',
        default: true
      },
      includeLocalKnowledge: {
        type: 'boolean',
        title: 'Include local knowledge',
        default: true
      },
      includeNavigational: {
        type: 'boolean',
        title: 'Include navigational',
        default: true
      },
      includeBoatRamp: {
        type: 'boolean',
        title: 'Include boat ramps',
        default: true
      },
      includeBusiness: {
        type: 'boolean',
        title: 'Include businesses',
        default: true
      },
      includeInlet: {
        type: 'boolean',
        title: 'Include inlets',
        default: true
      },
      includeLock: {
        type: 'boolean',
        title: 'Include locks',
        default: true
      },
      includeDam: {
        type: 'boolean',
        title: 'Include dams',
        default: true
      },
      includeFerry: {
        type: 'boolean',
        title: 'Include ferries',
        default: true
      },
      includeAirport: {
        type: 'boolean',
        title: 'Include airports',
        default: true
      },
      includeBridge: {
        type: 'boolean',
        title: 'Include bridges',
        default: true
      },
      cachingDurationMinutes: {
        type: 'number',
        title: 'How longer to cache data from Active Captain in minutes (longer = less data trafic; shorter = more up to date data)',
        default: 60
      }
    }
  }

  function registerAsNoteResourcesProvider () {
    try {
      app.registerResourceProvider({
        type: 'notes',
        methods: {
          listResources: (query) => {
            app.debug(`Incoming request to list note resources - query: ${JSON.stringify(query)}`)

            if (query.position != null && query.distance != null) {
              const bbox = positionUtils.positionToBbox(query.position, query.distance)

              const promises = []

              for (const struct of sourceConfig.values()) {
                const promise = struct.listMethod(app, bbox[0], bbox[1], bbox[2], bbox[3], struct.extraListMethodParams)
                  .then(entities => {
                    return entities.map(entity => {
                      return {
                        id: entity.id,
                        name: entity.name,
                        position: entity.position,
                        url: `https://activecaptain.garmin.com/en-US/pois/${entity.id}`,
                        mimeType: 'text/plain',
                        properties: {
                          readOnly: true,
                          skIcon: entity.type.toLowerCase()
                        },
                        timestamp: new Date().toISOString(),
                        $source: plugin.id
                      }
                    })
                  }, error => {
                    app.debug(`ERROR: ${error}`)
                    throw error
                  })

                promises.push(promise)
              }

              return Promise.all(promises)
                .then(promises => {
                  return promises.flat().reduce((map, obj) => {
                    map[obj.id] = obj
                    delete obj.id
                    return map
                  }, {})
                }, error => {
                  app.debug(`ERROR: ${error}`)
                  throw error
                })
            } else {
              app.debug(`WARN: Could not use provided query parameters - ${JSON.stringify(query)}`)
              return []
            }
          },
          getResource: (id, property) => {
            app.debug(`Incoming request to get note ${id} property ${property}`)

            const promises = []

            for (const struct of sourceConfig.values()) {
              const promise = struct.detailsCache.get(id)
              promises.push(promise)
            }

            return Promise.any(promises).then(entity => {
              let description = ''
              const formatterFunction = formatterUtilities[entity.pointOfInterest.poiType.toLowerCase()]
              if (typeof formatterFunction === 'function') {
                try {
                  description = formatterFunction(entity)
                } catch (error) {
                  app.debug(`ERROR: Unable to format description ${error}`)
                }
              }

              return {
                name: entity.pointOfInterest.name,
                description,
                url: `https://activecaptain.garmin.com/en-US/pois/${id}`,
                mimeType: 'text/plain',
                properties: {
                  readOnly: true,
                  skIcon: entity.pointOfInterest.poiType.toLowerCase()
                },
                $source: plugin.id
              }
            }, error => {
              app.debug(`ERROR: ${error}`)
              throw error
            })
          },
          setResource: (id, value) => {
            throw (new Error('Not supported!'))
          },
          deleteResource: (id) => {
            throw (new Error('Not supported!'))
          }
        }
      })
    } catch (error) {
      app.debug(`Cannot register as a notes resource provider ${error}`)
    }
  }

  function setupForPointsOfInterest (poiTypes, cachingDurationMinutes) {
    sourceConfig.set('PointsOfInterest', {
      detailsCache: loadingCache.Caches.builder().expireAfterWrite(time.Time.minutes(cachingDurationMinutes)).buildAsync(
        id => {
          app.debug(`Cache miss for point of interest ${id}`)
          return client.pointOfInterestDetails(app, id)
            .then(details => {
              return details
            }, error => {
              app.debug(`ERROR: ${error}`)
              throw error
            })
        }
      ),
      listMethod: client.listPointsOfInterest,
      extraListMethodParams: {
        poiTypes
      }
    })
  }

  return plugin
}
