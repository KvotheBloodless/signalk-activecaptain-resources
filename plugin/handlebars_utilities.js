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

const handlebars = require('handlebars')
const helpersForHandlebars = require('helpers-for-handlebars')
const fs = require('node:fs')
const moment = require('moment')

const EMPTY = ''
const UNKNOWN = 'Unknown'

module.exports = function (app) {
  const basePath = app.config.configPath.replace(/\/config$/, '')

  const partialsDir = `${basePath}/node_modules/signalk-activecaptain-resources/plugin/partials`
  const templatesDir = `${basePath}/node_modules/signalk-activecaptain-resources/plugin/templates`

  // Load partials
  handlebars.registerPartial('header', fs.readFileSync(`${partialsDir}/header.hbsp`, 'utf-8'))
  handlebars.registerPartial('footer', fs.readFileSync(`${partialsDir}/footer.hbsp`, 'utf-8'))
  handlebars.registerPartial('business', fs.readFileSync(`${partialsDir}/business.hbsp`, 'utf-8'))
  handlebars.registerPartial('dockage', fs.readFileSync(`${partialsDir}/dockage.hbsp`, 'utf-8'))
  handlebars.registerPartial('fuel', fs.readFileSync(`${partialsDir}/fuel.hbsp`, 'utf-8'))
  handlebars.registerPartial('amenities', fs.readFileSync(`${partialsDir}/amenities.hbsp`, 'utf-8'))
  handlebars.registerPartial('contact', fs.readFileSync(`${partialsDir}/contact.hbsp`, 'utf-8'))
  handlebars.registerPartial('review', fs.readFileSync(`${partialsDir}/review.hbsp`, 'utf-8'))

  // Main template
  const pointOfInterestTemplate = handlebars.compile(
    fs.readFileSync(`${templatesDir}/point_of_interest.hbs`, 'utf-8')
  )

  // Helper to safely check array length
  const safeLength = x => Array.isArray(x) ? x.length : 0

  return {
    helpers: function () {
      helpersForHandlebars.comparison()
      helpersForHandlebars.array()

      handlebars.registerHelper('fromNow', function (context) {
        return moment(new Date(context)).fromNow()
      })

      handlebars.registerHelper('hasFuel', function (options) {
        const fuel = this.data.fuel
        if (fuel) {
          const notesLen = safeLength(fuel.notes)
          if (
            fuel.diesel !== UNKNOWN ||
            fuel.ethanolFree !== UNKNOWN ||
            fuel.gas !== UNKNOWN ||
            fuel.propane !== UNKNOWN ||
            fuel.electric !== UNKNOWN ||
            notesLen > 0
          ) {
            return options.fn(this)
          }
        }
        return options.inverse(this)
      })

      handlebars.registerHelper('hasDockage', function (options) {
        const dock = this.data.dockage
        if (dock) {
          const notesLen = safeLength(dock.notes)
          if (
            dock.liveaboard !== UNKNOWN ||
            dock.secureAccess !== UNKNOWN ||
            dock.securityPatrol !== UNKNOWN ||
            notesLen > 0
          ) {
            return options.fn(this)
          }
        }
        return options.inverse(this)
      })

      handlebars.registerHelper('hasContact', function (options) {
        const c = this.data.contact
        if (c) {
          if (
            c.vhfChannel !== EMPTY ||
            c.phone !== EMPTY ||
            c.afterHourContact !== EMPTY ||
            c.email !== EMPTY ||
            c.website !== EMPTY
          ) {
            return options.fn(this)
          }
        }
        return options.inverse(this)
      })

      handlebars.registerHelper('hasAmenities', function (options) {
        const a = this.data.amenity
        if (a) {
          if (
            a.bar !== UNKNOWN ||
            a.boatRamp !== UNKNOWN ||
            a.cellReception !== UNKNOWN ||
            a.courtesyCar !== UNKNOWN ||
            a.laundry !== UNKNOWN ||
            a.lodging !== UNKNOWN ||
            a.pets !== UNKNOWN ||
            a.restaurant !== UNKNOWN ||
            a.restroom !== UNKNOWN ||
            a.shower !== UNKNOWN ||
            a.transportation !== UNKNOWN ||
            a.trash !== UNKNOWN ||
            a.water !== UNKNOWN ||
            a.wifi !== UNKNOWN
          ) {
            return options.fn(this)
          }
        }
        return options.inverse(this)
      })

      handlebars.registerHelper('hasBusiness', function (options) {
        const b = this.data.business
        if (b) {
          const notesLen = safeLength(b.notes)
          if (
            b.cash !== UNKNOWN ||
            b.check !== UNKNOWN ||
            b.credit !== UNKNOWN ||
            b.public !== UNKNOWN ||
            b.seasonal !== UNKNOWN ||
            notesLen > 0
          ) {
            return options.fn(this)
          }
        }
        return options.inverse(this)
      })
    },

    anchorage: data => pointOfInterestTemplate({ data }),
    hazard: data => pointOfInterestTemplate({ data }),
    marina: data => pointOfInterestTemplate({ data }),
    localKnowledge: data => pointOfInterestTemplate({ data }),
    navigational: data => pointOfInterestTemplate({ data }),
    boatRamp: data => pointOfInterestTemplate({ data }),
    business: data => pointOfInterestTemplate({ data }),
    inlet: data => pointOfInterestTemplate({ data }),
    lock: data => pointOfInterestTemplate({ data }),
    dam: data => pointOfInterestTemplate({ data }),
    ferry: data => pointOfInterestTemplate({ data }),
    airport: data => pointOfInterestTemplate({ data }),
    bridge: data => pointOfInterestTemplate({ data })
  }
}
