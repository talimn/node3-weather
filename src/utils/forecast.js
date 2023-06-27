const request = require('request')
const forecast = (lon, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f1bfe2e2d31ba064d9a904d2d304c4a5&query=' + lon + ',' + lat + '&units=f'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!')
        }

        else if (body.error) {
            callback('Unable to find location!')
        }

        else {
            callback(undefined, body.current.temperature)
        }
    })
}

module.exports = forecast