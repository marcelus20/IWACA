/**
 * Felipe Mantovani 2017192 CA IWA
 */

 //NPM modules
const http = require('http');
const express = require('express');
const path = require('path');



const Validator = require('jsonschema').Validator;


//My own libraries
const config = require('./backend/my-lib/config');
const helpers = require('./backend/my-lib/helpers');
const handlers = require('./backend/my-lib/handlers');


const v = new Validator();
const router = express();
const server = http.createServer(router);


//routers get
router.use(express.static(path.join(__dirname, 'frontend')));
router.use(express.json());

router.get('/', handlers.main);
router.get('/players', handlers.players)

//router post
router.post('/create_player', handlers.createPlayer);

//router delete
router.delete('/delete_player', handlers.delete);


server.listen(config.env.port, process.env.IP, ()=>{
    console.log(`Running on ${config.env.port} in the ${config.env.environment} environment`);
})
