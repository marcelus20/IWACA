const fs = require('fs');
const config = require('../my-lib/config');
const Player = require('../models/pojos').Player;
const DataStatus = require('../models/pojos').DataStatus;

handlers = {};


handlers.main = (request, response) => {
    const header = {
            'Content-Type': 'text/html'
    }
    response.writeHead(200, header);
    const players = helpers.readFile(config.playersLocation);
    const schema = helpers.readFile(config.schemaLocation);
    const toRespond = helpers.validateSchema(db, schema)
    const doc = helpers.validateSchema(players,schema)?player:false;
    response.end(doc);
}

handlers.players = (request, response) => {
    const header = {
            'Content-Type': 'application/json'
    }
    response.writeHead(200, header)
    const db = JSON.parse(helpers.readFile(config.playersLocation));
    const schema = helpers.readFile(config.schemaLocation);
    
    const result = db.players
        .map(player=>helpers.validateSchema(player, schema))
        .reduce((acc, item) => acc && item, true) ? JSON.stringify(new DataStatus(db.players, true)) : JSON.stringify(new DataStatus([], false));
    response.end(result);
}


handlers.createPlayer = (request, response) => {
    const {name, level, vocation, city, sex} = request.body;
    const id = helpers.genRandomChars(20);
    const db = JSON.parse(helpers.readFile(config.playersLocation));
    const player = new Player(id, name, Number.parseInt(level), vocation, city, sex);
    const schema = helpers.readFile(config.schemaLocation);

    if(helpers.validateSchema(player, schema)){
        db.players.push(player);
        helpers.writeFile(config.playersLocation, JSON.stringify(db), ()=>{
        response.end('true');
    });
    } else{
        response.end('false');
    }

    
    



}

handlers.delete = (request, response) => {
    const idDelete = request.query.id;
    const db = JSON.parse(helpers.readFile(config.playersLocation));
    const newPLayers = helpers.delete(idDelete, db.players);
    if(!newPLayers){
        response.end('false');
    }else{
        db.players = [...newPLayers];
        helpers.writeFile(config.playersLocation, JSON.stringify(db), ()=>{
            response.end('true');
        });
    }
}

handlers.cities = (request, response) =>{
      const header = {
            'Content-Type': 'application/json'
    }
    response.writeHead(200, header)
    const db = JSON.parse(helpers.readFile(config.playersLocation));
    const cities = db.cities;
    response.end(JSON.stringify(cities));
}

handlers.vocations = (request, response) =>{
      const header = {
            'Content-Type': 'application/json'
    }
    response.writeHead(200, header)
    const db = JSON.parse(helpers.readFile(config.playersLocation));
    const vocations = db.vocations;
    response.end(JSON.stringify(vocations));
}

module.exports = handlers;