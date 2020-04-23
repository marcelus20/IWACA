/**
 * Felipe Mantovani 2017192 CA IWA
 */

 //NPM modules
const logger     = require("morgan");
const cors       = require("cors");
const http       = require("http");
const express    = require("express");
const bodyParser = require("body-parser");
const mongoose   = require('mongoose');
const app        = express();
const port       = 3000;
const routes     = require('./routes');
require('dotenv').config()

//passing in the middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(routes);


//port listening
app.listen(port, function(err){
    console.log("Listening on Port: " + port);
});


//Stabilishing connection with the DB database
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});
mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});