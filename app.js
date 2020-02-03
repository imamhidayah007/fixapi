/**
 * Module dependencies.
 */

var express = require('express')
    , Daftar = require('./routes/login')
	, Tanya = require('./routes/voicebot2')
	, Sensor = require('./routes/sensor')
    , http = require('http')
    , path = require('path');
var cors = require('cors');
var app = express();
var bodyParser=require("body-parser");
var jwt = require('jsonwebtoken');
var mysql    = require('mysql');
require('dotenv').config();

/**
 * creating mysql connection.
 */

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database : process.env.DB_NAME
});

connection.connect(function(err){
    if(err)
        console.log(err);
});

global.db = connection;


var connection2 = mysql.createConnection({
    host: process.env.DB_HOST2,
    user: process.env.DB_USER2,
    password: process.env.DB_PASS2,
    database : process.env.DB_NAME2
});

connection2.connect(function(err){
    if(err)
        console.log(err);
});

global.db2 = connection2;



/**
 * all environments.
 */
app.set('port', process.env.PORT || 6092);
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * routes.
 */

//app.post('/register', Daftar.daftar);
app.post('/signin', Daftar.masuk);
//app.post('/updateUser', Daftar.editUser);
app.post('/pertanyaan', Tanya.tanya);
app.get('/sensorkata', Sensor.katakotor);
app.get('/kataganti', Sensor.kataganti);



/**
 * creating server.
 */

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});