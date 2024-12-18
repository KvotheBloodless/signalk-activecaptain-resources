/*
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

const axios = require('axios')

const baseUrl = 'https://activecaptain.garmin.com'
const userAgent = 'Signal K Active Captain Plugin'

axios.interceptors.request.use(request => {
  // console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
}, error => {
  Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // console.log('Received Response', JSON.stringify(response.data, null, 2))
  return response
}, error => {
  Promise.reject(error)
})

module.exports = {
  listPointsOfInterest: function (app, x1, y1, x2, y2) {
    const url = `${baseUrl}/community/api/v1/points-of-interest/bbox`

    return axios.post(url, {
      north: y1,
      west: x1,
      south: y2,
      east: x2,
      zoomLevel: 17
    }, {
      headers: {
        'User-Agent': userAgent,
        Accept: 'application/json'
      }
    }).then(response => {
      return response.data.pointsOfInterest.map(p => {
        return {
          id: p.id,
          type: p.poiType,
          position: {
            longitude: p.mapLocation.longitude,
            latitude: p.mapLocation.latitude
          },
          name: p.name
        }
      })
    }).catch(error => {
      app.debug(`ERROR fetching points of interest list ${x1}, ${y1}, ${x2}, ${y2} - ${error}`)
    })
  },
  pointOfInterestDetails: function (app, id) {
    const url = `${baseUrl}/community/api/v1/points-of-interest/${id}/summary`

    return axios.get(url, {
      headers: {
        'User-Agent': userAgent,
        Accept: 'application/json'
      }
    }).then(response => {
      return response.data
    }).catch(error => {
      app.debug(`ERROR fetching point of interest ${id} - ${error}`)
    })
  }
}
