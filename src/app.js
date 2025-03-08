const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Path definitions for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

const year_date =  new Date().getFullYear();

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Joel Edwards',
        page: 'page_home',
        year: year_date
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Joel Edwards',
        page: 'page_about',
        year: year_date
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Docs',
        subtitle: 'How can we help you today?',
        name: 'Joel Edwards',
        page: 'page_help',
        year: year_date
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help Article Not Found!',
        name: 'Joel Edwards',
        page: 'page_404',
        year: year_date
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address
    
    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(address,  (error, { longitude, latitude, location } = {}) => {
    
        if (error) {
            return res.send({
                error
            })
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
    
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                year: year_date
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page Not Found!',
        name: 'Joel Edwards',
        page: 'page_404',
        year: year_date
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})