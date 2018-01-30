/**
 * App imports
 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();


/**
 * Handlebar config var setters
 */
hbs.registerPartials(__dirname + '/views/partials');


/**
 * Express config var setters
 */
app.set('view engine', 'hbs');


/**
 * Express Middlewares
 */
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} - ${req.url}`;

    console.log(log);

    fs.appendFile('server.log', log + "\r\n", (err) => {
        console.log("unable to write to log file");
    });

    next();
});

app.use(express.static(__dirname + '/public'));


/**
 * Handlebar helpers
 */
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());


/**
 * Exprerss router
 */
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "Welcome to this awesome page!"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projetcs Page'
    });
})

app.listen(port, () => {
    console.log('Server is up on port: ', port)
});