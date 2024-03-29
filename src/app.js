const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: `Weather`,
    name: 'Surayya Fenton',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Surayya Fenton',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is the help page',
    name: 'Surayya',
    title: 'Help',
  });
});

// Weather forecast endpoint using geocode and forecast
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address required.',
    });
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        location,
        forecast: forecastData,
        address: req.query.address
      })
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help page not found',
    name: 'Surayya',
  });
});


// 404 handling 
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Surayya',
  });
});



app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
