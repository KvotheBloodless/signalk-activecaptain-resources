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

const partialsDir = './node_modules/signalk-activecaptain-resources/plugin/partials/'

handlebars.registerPartial('header', fs.readFileSync(`${partialsDir}/header.hbsp`, 'utf-8'))
handlebars.registerPartial('footer', fs.readFileSync(`${partialsDir}/footer.hbsp`, 'utf-8'))
handlebars.registerPartial('business', fs.readFileSync(`${partialsDir}/business.hbsp`, 'utf-8'))
handlebars.registerPartial('dockage', fs.readFileSync(`${partialsDir}/dockage.hbsp`, 'utf-8'))
handlebars.registerPartial('fuel', fs.readFileSync(`${partialsDir}/fuel.hbsp`, 'utf-8'))
handlebars.registerPartial('amenities', fs.readFileSync(`${partialsDir}/amenities.hbsp`, 'utf-8'))
handlebars.registerPartial('contact', fs.readFileSync(`${partialsDir}/contact.hbsp`, 'utf-8'))
handlebars.registerPartial('review', fs.readFileSync(`${partialsDir}/review.hbsp`, 'utf-8'))

const templatesDir = './node_modules/signalk-activecaptain-resources/plugin/templates/'

const pointOfInterestTemplate = handlebars.compile(fs.readFileSync(`${templatesDir}/point_of_interest.hbs`, 'utf-8'))

module.exports = {
  helpers: function () {
    helpersForHandlebars.comparison()
    helpersForHandlebars.array()

    handlebars.registerHelper('fromNow', function (context, _) {
      return moment(new Date(context)).fromNow()
    })

    handlebars.registerHelper('hasFuel', function (options) {
      if (this.data.fuel) {
        if (this.data.fuel.diesel !== UNKNOWN ||
              this.data.fuel.ethanolFree !== UNKNOWN ||
              this.data.fuel.gas !== UNKNOWN ||
              this.data.fuel.propane !== UNKNOWN ||
              this.data.fuel.electric !== UNKNOWN ||
              this.data.fuel.notes.length > 0) {
          return options.fn(this)
        }
      }
      return options.inverse(this)
    })

    handlebars.registerHelper('hasDockage', function (options) {
      if (this.data.dockage) {
        if (this.data.dockage.liveaboard !== UNKNOWN ||
            this.data.dockage.secureAccess !== UNKNOWN ||
            this.data.dockage.securityPatrol !== UNKNOWN ||
            this.data.dockage.notes.length > 0) {
          return options.fn(this)
        }
      }
      return options.inverse(this)
    })

    handlebars.registerHelper('hasContact', function (options) {
      if (this.data.contact) {
        if (this.data.contact.vhfChannel !== EMPTY ||
            this.data.contact.phone !== EMPTY ||
            this.data.contact.afterHourContact !== EMPTY ||
            this.data.contact.email !== EMPTY ||
            this.data.contact.website !== EMPTY) {
          return options.fn(this)
        }
      }
      return options.inverse(this)
    })

    handlebars.registerHelper('hasAmenities', function (options) {
      if (this.data.amenity) {
        if (this.data.amenity.bar !== UNKNOWN ||
          this.data.amenity.boatRamp !== UNKNOWN ||
          this.data.amenity.cellReception !== UNKNOWN ||
          this.data.amenity.courtesyCar !== UNKNOWN ||
          this.data.amenity.laundry !== UNKNOWN ||
          this.data.amenity.lodging !== UNKNOWN ||
          this.data.amenity.pets !== UNKNOWN ||
          this.data.amenity.restaurant !== UNKNOWN ||
          this.data.amenity.restroom !== UNKNOWN ||
          this.data.amenity.shower !== UNKNOWN ||
          this.data.amenity.transportation !== UNKNOWN ||
          this.data.amenity.trash !== UNKNOWN ||
          this.data.amenity.water !== UNKNOWN ||
          this.data.amenity.wifi !== UNKNOWN) {
          return options.fn(this)
        }
      }
      return options.inverse(this)
    })

    handlebars.registerHelper('hasBusiness', function (options) {
      if (this.data.business) {
        if (this.data.business.cash !== UNKNOWN ||
            this.data.business.check !== UNKNOWN ||
            this.data.business.credit !== UNKNOWN ||
            this.data.business.public !== UNKNOWN ||
            this.data.business.seasonal !== UNKNOWN ||
            this.data.business.notes.length > 0) {
          return options.fn(this)
        }
      }
      return options.inverse(this)
    })
  },
  anchorage: function (data) {
    return pointOfInterestTemplate({ data })
  },
  hazard: function (data) {
    return pointOfInterestTemplate({ data })
  },
  marina: function (data) {
    return pointOfInterestTemplate({ data })
  },
  localKnowledge: function (data) {
    return pointOfInterestTemplate({ data })
  },
  navigational: function (data) {
    return pointOfInterestTemplate({ data })
  },
  boatRamp: function (data) {
    return pointOfInterestTemplate({ data })
  },
  business: function (data) {
    return pointOfInterestTemplate({ data })
  },
  inlet: function (data) {
    return pointOfInterestTemplate({ data })
  },
  lock: function (data) {
    return pointOfInterestTemplate({ data })
  },
  dam: function (data) {
    return pointOfInterestTemplate({ data })
  },
  ferry: function (data) {
    return pointOfInterestTemplate({ data })
  },
  airport: function (data) {
    return pointOfInterestTemplate({ data })
  },
  bridge: function (data) {
    return pointOfInterestTemplate({ data })
  }
}
