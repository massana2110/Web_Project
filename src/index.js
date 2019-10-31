//Codigo de prueba para ver que el server funciona
var express = require('express'); //Requiero framework express
var app = express(); 

app.set('port', 3000); //Seteo el numero de puerto

app.get('/', function (req, res) {
  res.send('Hello World!');
});

//Listening the server
app.listen(app.get('port'), () => {
  console.log('Server Listening on port', app.get('port'));
});
