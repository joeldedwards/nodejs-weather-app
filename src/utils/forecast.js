const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1648fdebac35d306369fa1469ffcdbcd&query=${latitude},${longitude}&units=f`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location.', undefined)
        }
        else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                unit: body.request.unit,
                location: body.location.name,
                wind_speed: body.current.wind_speed,
                humidity: body.current.humidity,
                precipitation: body.current.precip,
                weather_code: body.current.weather_code,
                is_day: body.current.is_day,
                summary: `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out in ${body.location.name}. It feels like ${body.current.temperature} degrees out.`
            })
        }
    })

}

module.exports = forecast