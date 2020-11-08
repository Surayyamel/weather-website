const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=eac5ca6d77011efecb57ede6af725a71&query=' + longitude + ',' + latitude //+ '&units=f'
    request({ url, json: true }, (error, {body}) => {
       if(error) {
        callback('Unable to connect.', undefined)
       } else if(body.error) {
        callback('unable to find location.', undefined)
       } else {
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees. The humidity is ' + body.current.humidity + '%.')
       }

    })
  }

  module.exports = forecast