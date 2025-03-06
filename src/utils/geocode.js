const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=pk.eyJ1IjoidHJpbmljcmVhdGlvbnMiLCJhIjoiY2xmdWM3Z2ZqMDBqcTNzbnVzbmQ5cHRsMCJ9.gojWa9v1mHAte1-x4QtKlA&limit=1`

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        }
        else {
            callback(undefined, {
                longitude: body.features[0].geometry.coordinates[0],
                latitude: body.features[0].geometry.coordinates[1],
                location: body.features[0].properties.full_address
            })
        }
    })
}

module.exports = geocode