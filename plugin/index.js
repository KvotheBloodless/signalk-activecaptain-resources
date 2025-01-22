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
const handlebarsUtilities = require('./handlebars_utilities')
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
    handlebarsUtilities.helpers()

    setupPoiCache(options.cachingDurationMinutes)

    registerAsNoteResourcesProvider(options)
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
      cachingDurationMinutes: {
        type: 'number',
        title: 'How long to cache data from Active Captain in minutes (longer = less data trafic; shorter = more up to date data)',
        default: 60
      },
      marinas: {
        type: 'object',
        title: 'Marinas',
        properties: {
          include: {
            type: 'boolean',
            title: 'Include marinas',
            default: true
          },
          minZoomLevel: {
            type: 'number',
            description: 'Marinas will not be shown below this zoom level',
            title: 'Minimum zoom level',
            default: 10
          }
        }
      },
      anchorages: {
        type: 'object',
        title: 'Anchorages',
        properties: {
          include: {
            type: 'boolean',
            title: 'Include anchorages',
            default: true
          },
          minZoomLevel: {
            type: 'number',
            description: 'Anchorages will not be shown below this zoom level',
            title: 'Minimum zoom level',
            default: 10
          }
        }
      },
      hazards: {
        type: 'object',
        title: 'Hazards',
        properties: {
          include: {
            type: 'boolean',
            title: 'Include hazards',
            default: true
          },
          minZoomLevel: {
            type: 'number',
            description: 'Hazards will not be shown below this zoom level',
            title: 'Minimum zoom level',
            default: 10
          }
        }
      },
      businesses: {
        type: 'object',
        title: 'Businesses',
        properties: {
          include: {
            type: 'boolean',
            title: 'Include businesses',
            default: true
          },
          minZoomLevel: {
            type: 'number',
            description: 'Businesses will not be shown below this zoom level',
            title: 'Minimum zoom level',
            default: 10
          }
        }
      },
      boatRamps: {
        type: 'object',
        title: 'Boat Ramps',
        properties: {
          include: {
            type: 'boolean',
            title: 'Include boat ramps',
            default: true
          },
          minZoomLevel: {
            type: 'number',
            description: 'Boat ramps will not be shown below this zoom level',
            title: 'Minimum zoom level',
            default: 10
          }
        }
      },
      bridges: {
        type: 'object',
        title: 'Bridges',
        properties: {
          include: {
            type: 'boolean',
            title: 'Include bridges',
            default: true
          },
          minZoomLevel: {
            type: 'number',
            description: 'Bridges will not be shown below this zoom level',
            title: 'Minimum zoom level',
            default: 10
          }
        }
      },
      dams: {
        type: 'object',
        title: 'Dams',
        properties: {
          include: {
            type: 'boolean',
            title: 'Include dams',
            default: true
          },
          minZoomLevel: {
            type: 'number',
            description: 'Dams will not be shown below this zoom level',
            title: 'Minimum zoom level',
            default: 10
          }
        }
      },
      ferries: {
        type: 'object',
        title: 'Ferries',
        properties: {
          include: {
            type: 'boolean',
            title: 'Include ferries',
            default: true
          },
          minZoomLevel: {
            type: 'number',
            description: 'Ferries will not be shown below this zoom level',
            title: 'Minimum zoom level',
            default: 10
          }
        }
      },
      inlets: {
        type: 'object',
        title: 'Inlets',
        properties: {
          include: {
            type: 'boolean',
            title: 'Include inlets',
            default: true
          },
          minZoomLevel: {
            type: 'number',
            description: 'Inlets will not be shown below this zoom level',
            title: 'Minimum zoom level',
            default: 10
          }
        }
      },
      locks: {
        type: 'object',
        title: 'Locks',
        properties: {
          include: {
            type: 'boolean',
            title: 'Include locks',
            default: true
          },
          minZoomLevel: {
            type: 'number',
            description: 'Locks will not be shown below this zoom level',
            title: 'Minimum zoom level',
            default: 10
          }
        }
      }
    }
  }

  function buildPoiTypesString (options, zoom) {
    const poiTypes = []

    if (options.marinas.include && (!zoom || zoom >= options.marinas.minZoomLevel)) {
      poiTypes.push('Marina')
    }
    if (options.anchorages.include && (!zoom || zoom >= options.anchorages.minZoomLevel)) {
      poiTypes.push('Anchorage')
    }
    if (options.hazards.include && (!zoom || zoom >= options.hazards.minZoomLevel)) {
      poiTypes.push('Hazard')
    }
    if (options.businesses.include && (!zoom || zoom >= options.businesses.minZoomLevel)) {
      poiTypes.push('Business')
    }
    if (options.boatRamps.include && (!zoom || zoom >= options.boatRamps.minZoomLevel)) {
      poiTypes.push('BoatRamp')
    }
    if (options.bridges.include && (!zoom || zoom >= options.bridges.minZoomLevel)) {
      poiTypes.push('Bridge')
    }
    if (options.dams.include && (!zoom || zoom >= options.dams.minZoomLevel)) {
      poiTypes.push('Dam')
    }
    if (options.ferries.include && (!zoom || zoom >= options.ferries.minZoomLevel)) {
      poiTypes.push('Ferry')
    }
    if (options.inlets.include && (!zoom || zoom >= options.inlets.minZoomLevel)) {
      poiTypes.push('Inlet')
    }
    if (options.locks.include && (!zoom || zoom >= options.locks.minZoomLevel)) {
      poiTypes.push('Lock')
    }

    if (poiTypes.length === 0) return 'Marina,Anchorage,Hazard,Business,BoatRamp,Bridge,Dam,Ferry,Inlet,Lock'

    return poiTypes.join()
  }

  function registerAsNoteResourcesProvider (options) {
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
                const promise = struct.listMethod(app, bbox[0], bbox[1], bbox[2], bbox[3], buildPoiTypesString(options, query.zoom))
                  .then(entities => {
                    return entities.map(entity => {
                      return {
                        id: entity.id,
                        name: entity.name,
                        position: entity.position,
                        // group: entity.type,
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
              const formatterFunction = handlebarsUtilities[entity.pointOfInterest.poiType.toLowerCase()]
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
                position: {
                  longitude: entity.pointOfInterest.mapLocation.longitude,
                  latitude: entity.pointOfInterest.mapLocation.latitude
                },
                url: `https://activecaptain.garmin.com/en-US/pois/${id}`,
                mimeType: 'text/plain',
                properties: {
                  readOnly: true,
                  skIcon: entity.pointOfInterest.poiType.toLowerCase()
                },
                timestamp: entity.pointOfInterest.dateLastModified,
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

  function setupPoiCache (cachingDurationMinutes) {
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
      listMethod: client.listPointsOfInterest
    })
  }

  return plugin
}
