const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../views/partials')

// Setup handlebars engine location
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

// Home Page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Taylor Mosser'
    })
})

// About Page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Ashlyn'
    })
})

// Help Page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tali'
    })
})

// Weather Page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter a valid location.,'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
    
        })
    })

    /* res.send({
        forecast: 'cloudy',
        location: 'Houston',
        address: req.query.address
    }) */
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    res.send({
        products: []
    })
})

// 404 Pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Taylor Mosser',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Taylor Mosser',
        errorMessage: 'Page not found.'
    })
})

// Server setup
app.listen(port, () => {
    console.log(`Server is up on port on ${port}!`)
})