var xml = require("js2xmlparser");
const fs = require('fs');
const xslProcess_ = require('xslt-processor').xsltProcess;
const config = require('../my-lib/config');
const Player = require('../models/pojos').Player;
const xml2json = require('xml2json');



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
    response.end(JSON.stringify(db.players));
}


handlers.createPlayer = (request, response) => {
    const {name, level, vocation, city, sex} = request.body;
    const id = helpers.genRandomChars(20);
    const db = JSON.parse(helpers.readFile(config.playersLocation));
    const player = new Player(id, name, Number.parseInt(level), vocation, city, sex);
    const schema = helpers.readFile(config.schemaLocation);


    db.players.push(player);

    
    helpers.writeFile(config.playersLocation, JSON.stringify(db), ()=>{
        response.end('true');
    });



}

handlers.delete = (request, response) => {
    const {idDelete} = request.body;
    const db = JSON.parse(helpers.readFile(config.playersLocation));
    db.players = [...helpers.delete(idDelete, db.players)];
    helpers.writeFile(config.playersLocation, JSON.stringify(db), ()=>{
        response.end('Fine!');
    });
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