/*
 * MIT License
 *
 * Copyright (c) 2024 Paul Willems
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

const request = require("request");
const poiKey = "pointsOfInterest.activeCaptain";
const userAgent = "Signal K ActiveCaptain Plugin";

const unknownId = "1e2bf981-4a24-4dce-8649-63ec18eb5aee";
const anchorageId = "14da5ca-0336-48cf-8f2a-1cdfacd20804";
const hazardId = "c1caea0b-7acd-4817-8b0d-459445adef8c";
const marinaId = "249810ee-9011-4137-90ec-777866694e28";
const localKnowledgeId = "bafd564f-24a8-459d-9a45-9343447150bc";
const navigationalId = "48877ebe-95d4-43c7-b273-bb166547207c";
const boatRampId = "c71dc5ac-d065-49f1-a1ef-9629e0b3b42a";
const businessId = "c076b861-fc5d-4c24-8958-48c0b3c093b5";
const inletId = "b8cd7e7a-2a27-4477-9886-8998241df708";
const lockId = "d884dd95-e40c-424e-a0dc-11c179e1b19b";
const damId = "9c4ce8ee-412e-4d75-8864-62d858fcbf36";
const ferryId = "b22f1bfc-8bd9-4153-9522-41cbdb29049a";
const airportId = "95f52139-9efb-4170-a583-48deb97ae97e";
const bridgeId = "f989f0ed-fe54-4527-9403-62ca70a35aba";

const ids = {
  "Unknown": unknownId,
  "Anchorage": anchorageId,
  "Hazard": hazardId,
  "Marina": marinaId,
  "LocalKnownledge": localKnowledgeId,
  "Navigational": navigationalId,
  "BoatRamp": boatRampId,
  "Business": businessId,
  "Inlet": inletId,
  "Lock": lockId,
  "Dam": damId,
  "Ferry": ferryId,
  "Airport": airportId,
  "Bridge": bridgeId
};

const customResourcesTemplate = {
  [unknownId]: {
    type: "ResourceSet",
    name: "Unclassified",
    description: "Garmin Active Captain unclassified points of interest",
    styles: {
      default: {
        width: 7,
        stroke: "black",
        fill: "white",
        lineDash: [1, 0]
      }
    },
    values: {
      type: "FeatureCollection",
      features: [
      ]
    }
  },
  [anchorageId]: {
    type: "ResourceSet",
    name: "Anchorages",
    description: "Garmin Active Captain anchorages",
    styles: {
      default: {
        width: 7,
        stroke: "black",
        fill: "aqua",
        lineDash: [1, 0]
      }
    },
    values: {
      type: "FeatureCollection",
      features: [
      ]
    }
  },
  [hazardId]: {
    type: "ResourceSet",
    name: "Hazards",
    description: "Garmin Active Captain hazards",
    styles: {
      default: {
        width: 7,
        stroke: "black",
        fill: "red",
        lineDash: [3, 3]
      }
    },
    values: {
      type: "FeatureCollection",
      features: [
      ]
    }
  },
  [marinaId]: {
    type: "ResourceSet",
    name: "Marinas",
    description: "Garmin Active Captain marinas",
    styles: {
      default: {
        width: 7,
        stroke: "black",
        fill: "blue",
        lineDash: [1, 0]
      }
    },
    values: {
      type: "FeatureCollection",
      features: [
      ]
    }
  },
  [localKnowledgeId]: {
    type: "ResourceSet",
    name: "Local Knowledge",
    description: "Garmin Active Captain local knowledge",
    styles: {
      default: {
        width: 7,
        stroke: "black",
        fill: "teal",
        lineDash: [1, 0]
      }
    },
    values: {
      type: "FeatureCollection",
      features: [
      ]
    }
  },
  [navigationalId]: {
    type: "ResourceSet",
    name: "Navigational Information",
    description: "Garmin Active Captain navigational information",
    styles: {
      default: {
        width: 7,
        stroke: "black",
        fill: "lime",
        lineDash: [1, 0]
      }
    },
    values: {
      type: "FeatureCollection",
      features: [
      ]
    }
  },
  [boatRampId]: {
    type: "ResourceSet",
    name: "Boat Ramps",
    description: "Garmin Active Captain boat ramps",
    styles: {
      default: {
        width: 7,
        stroke: "black",
        fill: "navy",
        lineDash: [1, 0]
      }
    },
    values: {
      type: "FeatureCollection",
      features: [
      ]
    }
  },
  [businessId]: {
    type: "ResourceSet",
    name: "Businesses",
    description: "Garmin Active Captain businesses",
    styles: {
      default: {
        width: 7,
        stroke: "black",
        fill: "olive",
        lineDash: [1, 0]
      }
    },
    values: {
      type: "FeatureCollection",
      features: [
      ]
    }
  },
  [inletId]: {
    type: "ResourceSet",
    name: "Inlets",
    description: "Garmin Active Captain inlets",
    styles: {
      default: {
        width: 7,
        stroke: "black",
        fill: "lime",
        lineDash: [1, 0]
      }
    },
    values: {
      type: "FeatureCollection",
      features: [
      ]
    }
  },
  [lockId]: {
    type: "ResourceSet",
    name: "Locks",
    description: "Garmin Active Captain locks",
    styles: {
      default: {
        width: 7,
        stroke: "black",
        fill: "yellow",
        lineDash: [1, 0]
      }
    },
    values: {
      type: "FeatureCollection",
      features: [
      ]
    }
  },
  [damId]: {
    type: "ResourceSet",
    name: "Dams",
    description: "Garmin Active Captain dams",
    styles: {
      default: {
        width: 7,
        stroke: "black",
        fill: "green",
        lineDash: [1, 0]
      }
    },
    values: {
      type: "FeatureCollection",
      features: [
      ]
    }
  },
  [ferryId]: {
    type: "ResourceSet",
    name: "Ferries",
    description: "Garmin Active Captain ferries",
    styles: {
      default: {
        width: 7,
        stroke: "black",
        fill: "fuschia",
        lineDash: [1, 0]
      }
    },
    values: {
      type: "FeatureCollection",
      feeatures: [
      ]
    }
  },
  [airportId]: {
    type: "ResourceSet",
    name: "Airports",
    description: "Garmin Active Captain airports",
    styles: {
      default: {
        width: 7,
        stroke: "black",
        fill: "purple",
        lineDash: [1, 0]
      }
    },
    values: {
      type: "FeatureCollection",
      features: [
      ]
    }
  },
  [bridgeId]: {
    type: "ResourceSet",
    name: "Bridges",
    description: "Garmin Active Captain bridges",
    styles: {
      default: {
        width: 7,
        stroke: "black",
        fill: "maroon",
        lineDash: [1, 0]
      }
    },
    values: {
      type: "FeatureCollection",
      features: [
      ]
    }
  }
};

module.exports = function(app) {

  const plugin = {
    id: "signalk-activecaptain-resources",
    name: "Garmin Active Captain Resources",
    description: "Provides points of interest from Garmin Active Captain API as SignalK resources" 
  };

  var interval;

  plugin.start = function(options) {

    setTimeout(function() {

      checkAndPublishPois(options.radius);
    }, 15 * 1000);

    // Setup the refresh
    interval = setInterval(function() {

      checkAndPublishPois(options.radius);
    }, options.frequency * 60 * 1000);

    // Register as resource providers
    registerAsCustomResourcesProvider();
    if(options.noteResources) {

      registerAsNoteResourcesProvider();
    }
  }

  plugin.stop =  function() {

    if(interval) {

      clearInterval(interval);
    }
  };

  plugin.schema = {
    title: "A registration form",
    description: "This plugin queries Garmin's Active Captain API for points of interest in the vicinity of your boat, and makes these available as resources on the SignalK server. The resources will be published as a custom type (activecaptain) formatted specifically for the Freeboard plotter. Optionally, the resources may also be published as standard 'note' type resources to be consumed by other plugins.",
    type: "object",
    required: ["radius", "frequency"],
    properties: {
      radius: {
        type: "number",
        title: "Approxiate radius (km) from which to retrieve points of interest",
        default: 50
      },
      frequency: {
        type: "number",
        title: "Frequency (minutes) with which to refresh the data",
        default: 15
      },
      noteResources: {
        type: "boolean",
        title: "(optional) Publish ActiveCaptain points of interest as note resources using the resource API",
        default: false
      }
    }
  }

  var customResources = {};

  function registerAsCustomResourcesProvider() {

    try {

      app.registerResourceProvider({
        type: "activecaptain",
        methods: {
          listResources: (params) => { 
            return new Promise((resolve, reject) => {

              resolve(customResources);
            })
          },
          getResource: (id, property) => { 

            throw(new Error("Not implemented!"))
          },
          setResource: (id, value) => { 

            throw(new Error("Not implemented!"))
          },
          deleteResource: (id) => { 

            throw(new Error("Not implemented!"))
          }
        }
      });
    } catch (error) {

      app.debug(`Cannot register as a resource provider ${error}`);
    }
  }

  var noteResources = {};

  function registerAsNoteResourcesProvider() {

    try {

      app.registerResourceProvider({
        type: "notes",
        methods: {
          listResources: (params) => { 

            app.debug(`Incoming request to list note resources - ${JSON.stringify(noteResources)}`)
            return new Promise((resolve, reject) => {
              resolve(noteResources)
            })
          },
          getResource: (id, property) => { 

            app.debug("Incoming request to get note resource")
            return new Promise((resolve, reject) => {
              resolve(noteResources[id])
            })
          },
          setResource: (id, value) => { 

            throw(new Error("Not implemented!"))
          },
          deleteResource: (id) => { 

            throw(new Error("Not implemented!"))
          }
        }
      });
    } catch (error) {

      app.debug(`Cannot register as a resource provider ${error}`);
    }
  }

  function calculateNewPosition(latitude, longitude, bearing, distance) {

    const earthRadius = 6371; // Radius of the Earth in kilometers
    const latitudeRad = toRadians(latitude);
    const longitudeRad = toRadians(longitude);
    const bearingRad = toRadians(bearing);

    const newLatitudeRad = Math.asin(Math.sin(latitudeRad) * Math.cos(distance / earthRadius) +
      Math.cos(latitudeRad) * Math.sin(distance / earthRadius) * Math.cos(bearingRad));

    const newLongitudeRad = longitudeRad + Math.atan2(Math.sin(bearingRad) * Math.sin(distance / earthRadius) * Math.cos(latitudeRad),
      Math.cos(distance / earthRadius) - Math.sin(latitudeRad) * Math.sin(newLatitudeRad));

    const newLatitude = toDegrees(newLatitudeRad);
    const newLongitude = toDegrees(newLongitudeRad);

    return { latitude: newLatitude, longitude: newLongitude };
  }

  function toRadians(degrees) {

    return degrees * Math.PI / 180;
  }

  function toDegrees(radians) {

    return radians * 180 / Math.PI;
  }

  function checkAndPublishPois(radius) {

    let position = app.getSelfPath('navigation.position');
    if (!position) {
    
      app.debug(JSON.stringify(position));
      return;
    }

    let lat = position.value.latitude;
    let lng = position.value.longitude;

    retrievePois(radius, lat, lng);
  }

  function retrievePoiDetails(poi) {

    app.debug(`Retrieving POI details for ID ${poi.id}`);

    let url=`https://activecaptain.garmin.com/community/api/v1/points-of-interest/${poi.id}/summary`;
    request.get({
      url: url,
      json: true,
      headers: {
        "User-Agent": userAgent,
      }
    }, function(error, response, data) {

      if (!error && response.statusCode == 200) {

        if (!data.pointOfInterest) {
          
          app.debug(`Cannot decode response for POI ${poi.id}: ${JSON.stringify(data)}`);
          return;
        }

        let shortNotes = "";
        let longNotes = "";
        let i = 0;
        if (data.pointOfInterest.notes) {
          
          for(const note of data.pointOfInterest.notes) {
            
            i++;

            if(i == 1) {

              shortNotes = note.value;
              // We don't want to trash SignalK with a ton of text
              const lengthLimit = 280;
              if (shortNotes.length > lengthLimit) {

                shortNotes = shortNotes.slice(0, lengthLimit) + "...";
              }
            }

            longNotes += `Note ${i} - ${note.value}\n`;
          }
        } else {

          shortNotes = "";
          longNotes = "";
        }

        noteResources[poi.id] = {
          name: data.pointOfInterest.name,
          description: longNotes,
          position: data.pointOfInterest.mapLocation,
          group: data.pointOfInterest.poiType,
          url: `https://activecaptain.garmin.com/en-US/pois/${poi.id}`
        }

        customResources[ids[data.pointOfInterest.poiType]].values.features.push({ 
          geometry: {
            type: "Point",
            coordinates: [data.pointOfInterest.mapLocation.longitude, data.pointOfInterest.mapLocation.latitude]
          },
          properties: {
            description: longNotes,
            name: data.pointOfInterest.name
          }
        });

        app.debug(`Published details for POI ${poi.id}`);
      } else {

        app.debug(`Error retrieving ${url}: ${JSON.stringify(response)}`);
      }
    });
  }

  function retrievePois(radius, lat, lng) {

    initCustomResources();

    let url="https://activecaptain.garmin.com/community/api/v1/points-of-interest/bbox";
    // Calculate the coordinates of the "box" that we will use to retrieve the POIs
    // This is a rectangle with radius (km) diagonal length
    let nwCoords = calculateNewPosition(lat, lng, -45, radius);
    let seCoords = calculateNewPosition(lat, lng, 135, radius);
    request.post({
      url: url,
      json: true,
      headers: {
        "User-Agent": userAgent,
      },
      json: {
        // This is a super crude way of calculating "distance" but will do for now unless people go to the poles
        "north": nwCoords.latitude,
        "west": nwCoords.longitude,
        "south": seCoords.latitude,
        "east": seCoords.longitude,
        "zoomLevel": 17 // Get granular
      }
    }, function(error, response, data) {
      if (!error && response.statusCode == 200) {

        if (!data.pointsOfInterest) {

          return;
        }
        data.pointsOfInterest.map( poiSummary => {

          retrievePoiDetails(poiSummary); 
        });
      } else {

        app.debug(`Error retrieving stations ${JSON.stringify(response)}`);
      }
    });
  }

  function initCustomResources() {

    customResources = structuredClone(customResourcesTemplate);
  }

  function initNoteResources() {

    noteResources = {};
  }

  function sleep(ms) {
  
    return new Promise(resolve => setTimeout(resolve, ms));
  }
 
  return plugin;
}

