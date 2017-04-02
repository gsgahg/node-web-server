const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  var now = new Date().toString();
  console.log(now + ': ' + req.method + req.url);
  next();
});

hbs.registerHelper('getCurrentYear', function() {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text) {
  return text.toUpperCase();
});

app.get('/about', function(req, res) {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', function(req, res) {
  res.send({
    error: 'bad request'
  });
});

app.get('/', function(req, res) {
  // res.send('<h1>hello express</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'welcome to the home page'
  });
});

app.listen(port, function() {
  console.log('server is up on port ' + port);
});
