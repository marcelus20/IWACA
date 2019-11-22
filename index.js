/**
 * Felipe Mantovani 2017192 CA IWA
 */

 //NPM modules
const http = require('http');
const express = require('express');
const path = require('path');

const Validator = require('jsonschema').Validator;


//My own libraries
const config = require('./my-lib/config');
const helpers = require('./my-lib/helpers');
const handlers = require('./my-lib/handlers');



//My pojo classes
const Player = require('./models/Player');
const Quest = require('./models/Quest');



const v = new Validator();
const router = express();
const server = http.createServer(router);


//routers
router.get('/', handlers.main);
router.get('/players', handlers.players)
router.get('/quests', handlers.quests)


server.listen(config.env.port, process.env.IP, ()=>{
    console.log(`Running on ${config.env.port} in the ${config.env.environment} environment`);
})
