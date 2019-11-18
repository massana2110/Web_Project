/**
 * Module Dependencies
 */
const express = require('express'); 
const http = require('http');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express(); 
require('./config/database');

/**
 * Settings
 */
app.set('port', process.env.PORT || 3000); //Seteo el numero de puerto

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

/**
 * Middlewares
 */
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
	secret: 'mysecretapp',
	resave: true,
	saveUninitialized: true
}));
/**
 * Routes
 */
app.use(require('./routes'));
app.use(require('./routes/users'));
app.use(require('./routes/add_reservation'));


//Listening the server
http.createServer(app).listen(app.get("port"), function () {
	console.log("Express server listening on port " + app.get("port"));
})