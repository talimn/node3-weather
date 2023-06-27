const request = require('request')
const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidGFtb3NzIiwiYSI6ImNsajh6azE3YTB4OTgzZm5xcnAyN2lreDkifQ.Slh4LwJJY7ZIKW56CAyxyw&limit=1'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!') // Don't need a second argument because defaults to 'undefined' by Javascript
        }
        else if (body.features.length === 0) {
            callback('Unable to find location!')
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode