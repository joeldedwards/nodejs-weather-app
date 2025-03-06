const weather_form = document.querySelector('form')
const search = document.querySelector('input')

weather_form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value
    const fetchUrl = '/weather?address=' + location

    const elemLocation = document.querySelector('#location'),
        elemDegrees = document.querySelector('#degrees'),
        elemDescription = document.querySelector('#desc'),
        elemPrecipitation = document.querySelector('#precipitation .value'),
        elemHumidity = document.querySelector('#humidity .value'),
        elemWindSpeed = document.querySelector('#wind_speed .value'),
        elemWeatherIcon = document.querySelector('#temperature #icon img'),
        elemError = document.querySelector('.error');

        elemLocation.textContent = ''
        elemDegrees.textContent = ''
        elemDescription.textContent = ''
        elemPrecipitation.textContent = ''
        elemHumidity.textContent = ''
        elemWindSpeed.textContent = ''
        elemError.textContent = ''

    fetch(fetchUrl).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                elemError.textContent = data.error
            }
            else {
                let weather_code = '116',
                    icon_code = '6';

                switch (weather_code) {
                    case '143':
                    case '248':
                        icon_code = '4' // Fog/Mist
                        break;
                    case '227':
                    case '230':
                    case '237':
                    case '350':
                    case '395':
                        icon_code = '3' // Snow
                        break;
                    case '392':
                    case '392':
                        icon_code = '2' // Light Snow
                        break;
                    case '113':
                        icon_code = '18' // Sunny
                        break;
                    case '200':
                        icon_code = '1' // Thunderstorms
                        break;
                    case '308':
                    case '296':
                    case '356':
                    case '359':
                        icon_code = '13' // Rain
                        break;
                    case '116':
                    case '119':
                        icon_code = '12' // Partly Cloudy
                        break;
                    default:
                        icon_code = '6'
                }
                
                elemLocation.textContent = data.forecast.location
                elemDegrees.textContent = data.forecast.temperature
                elemDescription.textContent = data.forecast.description
                elemPrecipitation.textContent = `${data.forecast.precipitation}%`
                elemHumidity.textContent = `${data.forecast.humidity}%`
                elemWindSpeed.textContent = `${data.forecast.wind_speed} mph`
                elemWeatherIcon.src = `/img/icons/${icon_code}.svg`

                document.querySelector('#searchLocation').classList = 'animate__animated animate__fadeOut'
                document.querySelector('#searchLocation').style.display = 'none'
                if (data.forecast.is_day === 'yes') {
                    document.querySelector('#app').classList = 'light'
                }
                else {
                    document.querySelector('#app').classList = 'dark'
                }

                document.querySelector('#showForecast').style.display = 'flex'
                document.querySelector('#showForecast').classList = 'animate__animated animate__zoomIn'
            }
        })
    })
    
})