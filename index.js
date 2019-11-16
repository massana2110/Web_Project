/**
 * Module Dependencies
 */
const express = require('express'); 
const http = require('http');
const path = require('path');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users')
const reservationRouter = require('./routes/add_reservation');

var app = express(); 
require('./config/database');
/**
 * Settings
 */
app.set('port', process.env.PORT || 3000); //Seteo el numero de puerto

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
 */
app.use('/', indexRouter);
app.use('/users', usersRouter );
app.use('/reservaciones', reservationRouter);


//Listening the server
http.createServer(app).listen(app.get("port"), function () {
	console.log("Express server listening on port " + app.get("port"));
})