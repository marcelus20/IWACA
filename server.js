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
// const userCtrl  = require('./user-controller');

app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(require('./routes'));

app.listen(port, function(err){
    console.log("Listening on Port: " + port);
});
    


// //My own libraries
// const config = require('./backend/my-lib/config');
// const helpers = require('./backend/my-lib/helpers');
// const handlers = require('./backend/my-lib/handlers');


// const v = new Validator();


// const router = express();
// const server = http.createServer(router);


// //routers get
// router.use(express.static(path.join(__dirname, 'frontend')));
// router.use(express.json());
// router.use(expAutoSan.allUnsafe);

// router.get('/', handlers.main);
// router.get('/players', handlers.players);
// router.get('/cities', handlers.cities);
// router.get('/vocations', handlers.vocations);


// //router post
// router.post('/player', handlers.createPlayer);

// //updating
// router.put('/player', handlers.update);

// //router delete
// router.delete('/player', handlers.delete);


// server.listen(config.env.port, process.env.IP, ()=>{
//     console.log(process.env.MONGODB_URL);
//     console.log(`Running on ${config.env.port} in the ${config.env.environment} environment`);
// })


mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});
mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});