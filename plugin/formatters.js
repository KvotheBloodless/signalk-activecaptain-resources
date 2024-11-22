const fs = require('node:fs');
const Handlebars = require('handlebars')
const moment = require('moment')

Handlebars.registerHelper('dateFormat', function (context, block) {
  return moment(new Date(context)).format(block.hash.format || 'MMM Do, YYYY')
})

const partialsDir = './node_modules/signalk-activecaptain-resources/plugin/partials/'

Handlebars.registerPartial('header', fs.readFileSync(`${partialsDir}/header.hbsp`, 'utf-8'));
Handlebars.registerPartial('address', fs.readFileSync(`${partialsDir}/address.hbsp`, 'utf-8'));
Handlebars.registerPartial('business', fs.readFileSync(`${partialsDir}/business.hbsp`, 'utf-8'));
Handlebars.registerPartial('businessPhoto', fs.readFileSync(`${partialsDir}/businessPhoto.hbsp`, 'utf-8'));
Handlebars.registerPartial('businessProgram', fs.readFileSync(`${partialsDir}/businessProgram.hbsp`, 'utf-8'));
Handlebars.registerPartial('competitor', fs.readFileSync(`${partialsDir}/competitor.hbsp`, 'utf-8'));
Handlebars.registerPartial('dockage', fs.readFileSync(`${partialsDir}/dockage.hbsp`, 'utf-8'));
Handlebars.registerPartial('fuel', fs.readFileSync(`${partialsDir}/fuel.hbsp`, 'utf-8'));
Handlebars.registerPartial('amenity', fs.readFileSync(`${partialsDir}/amenity.hbsp`, 'utf-8'));
Handlebars.registerPartial('contact', fs.readFileSync(`${partialsDir}/contact.hbsp`, 'utf-8'));
Handlebars.registerPartial('mooring', fs.readFileSync(`${partialsDir}/mooring.hbsp`, 'utf-8'));
Handlebars.registerPartial('navigation', fs.readFileSync(`${partialsDir}/navigation.hbsp`, 'utf-8'));
Handlebars.registerPartial('retail', fs.readFileSync(`${partialsDir}/retail.hbsp`, 'utf-8'));
Handlebars.registerPartial('review', fs.readFileSync(`${partialsDir}/review.hbsp`, 'utf-8'));
Handlebars.registerPartial('services', fs.readFileSync(`${partialsDir}/services.hbsp`, 'utf-8'));

const templatesDir = './node_modules/signalk-activecaptain-resources/plugin/templates/'

const unknownTemplate = Handlebars.compile(fs.readFileSync(`${templatesDir}/unknown.hbs`, 'utf-8'))
const anchorageTemplate = Handlebars.compile(fs.readFileSync(`${templatesDir}/anchorage.hbs`, 'utf-8'))
const hazardTemplate = Handlebars.compile(fs.readFileSync(`${templatesDir}/hazard.hbs`, 'utf-8'))
const marinaTemplate = Handlebars.compile(fs.readFileSync(`${templatesDir}/marina.hbs`, 'utf-8'))
const localKnownledgeTemplate = Handlebars.compile(fs.readFileSync(`${templatesDir}/localKnowledge.hbs`, 'utf-8'))
const navigationalTemplate = Handlebars.compile(fs.readFileSync(`${templatesDir}/navigational.hbs`, 'utf-8'))
const boatRampTemplate = Handlebars.compile(fs.readFileSync(`${templatesDir}/boatRamp.hbs`, 'utf-8'))
const businessTemplate = Handlebars.compile(fs.readFileSync(`${templatesDir}/business.hbs`, 'utf-8'))
const inletTemplate = Handlebars.compile(fs.readFileSync(`${templatesDir}/inlet.hbs`, 'utf-8'))
const lockTemplate = Handlebars.compile(fs.readFileSync(`${templatesDir}/lock.hbs`, 'utf-8'))
const damTemplate = Handlebars.compile(fs.readFileSync(`${templatesDir}/dam.hbs`, 'utf-8'))
const ferryTemplate = Handlebars.compile(fs.readFileSync(`${templatesDir}/ferry.hbs`, 'utf-8'))
const airportTemplate = Handlebars.compile(fs.readFileSync(`${templatesDir}/airport.hbs`, 'utf-8'))
const bridgeTemplate = Handlebars.compile(fs.readFileSync(`${templatesDir}/bridge.hbs`, 'utf-8'))

module.exports = {
  unknown: function (pointOfInterest) {
    return unknownTemplate({ bar: 'Bar' })
  },
  anchorage: function (pointOfInterest) {
    return anchorageTemplate({ bar: 'Bar' })
  },
  hazard: function (pointOfInterest) {
    return hazardTemplate({ bar: 'Bar' })
  },
  marina: function (pointOfInterest) {
    return marinaTemplate({ bar: 'Bar' })
  },
  localKnowledge: function (pointOfInterest) {
    return localKnownledgeTemplate({ bar: 'Bar' })
  },
  navigational: function (pointOfInterest) {
    return navigationalTemplate({ bar: 'Bar' })
  },
  boatRamp: function (pointOfInterest) {
    return boatRampTemplate({ bar: 'Bar' })
  },
  business: function (pointOfInterest) {
    return businessTemplate({ bar: 'Bar' })
  },
  inlet: function (pointOfInterest) {
    return inletTemplate({ bar: 'Bar' })
  },
  lock: function (pointOfInterest) {
    return lockTemplate({ bar: 'Bar' })
  },
  dam: function (pointOfInterest) {
    return damTemplate({ bar: 'Bar' })
  },
  ferry: function (pointOfInterest) {
    return ferryTemplate({ bar: 'Bar' })
  },
  airport: function (pointOfInterest) {
    return airportTemplate({ bar: 'Bar' })
  },
  bridge: function (pointOfInterest) {
    // { dateLastModified: '2024-11-09T22:31:27.351', id: 562885, mapLocation: { latitude: 46.83524406668227, longitude: 4.832108945120127 }, name: "Pont de l'A6", poiType: 'Bridge' }
    return bridgeTemplate({ pointOfInterest })
  }
}
