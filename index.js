/**
 * Module Dependencies
 */
const express = require('express'); 
const http = require('http');
const path = require('path');

const indexRouter = require('./routes/index');
//const reservationRouter = require('./routes/add_reservation');

var app = express(); 

/**
 * Settings
 */
app.set('port', process.env.PORT || 3000); //Seteo el numero de puerto

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/', reservationRouter);

app.get('/', function (req, res) {
	  res.render("index")
	  res.render("add_reservation")
});

//Listening the server
http.createServer(app).listen(app.get("port"), function () {
	console.log("Express server listening on port " + app.get("port"));
})