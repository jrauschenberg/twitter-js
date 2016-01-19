var express = require('express');
var app = express();
var swig = require('swig');
var routes = require('./routes/');
var bodyParser = require('body-parser');
var socketio = require('socket.io');

swig.setDefaults({cache: false});

var server = app.listen(3000);
var io = socketio.listen(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes(io));

app.use(express.static('public'));

app.engine("html", swig.renderFile);

app.set("view engine", "html");

app.set("views", __dirname + "/views")




