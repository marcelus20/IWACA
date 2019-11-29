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
    const fileXls = helpers.readFile(config.xslIndexLocation);
    const schema = helpers.readFile(config.schemaLocation);
    const doc = helpers.validateSchema(players,schema)?players:false;
    const stylesheet = xmlParse(fileXls);
    const result = doc?xslProcess_(doc, stylesheet).toString():"<html><body>invalid</body></html>";
    response.end(result);
}

handlers.players = (request, response) => {
    const header = {
            'Content-Type': 'application/json'
    }
    response.writeHead(200, header)
    const db = JSON.parse(helpers.readFile(config.playersLocation));
    response.end(JSON.stringify(db.players));
}


handlers.createPlayer = (request, response) => {
    const {name, level, vocation, city, sex} = request.body;
    const id = helpers.genRandomChars(20);
    const db = JSON.parse(helpers.readFile(config.playersLocation));
    const player = new Player(id, name, Number.parseInt(level), vocation, city, sex);

    db.players.push(player);

    helpers.writeFile(config.playersLocation, JSON.stringify(db), ()=>{
        response.end('Fine!');
    });
}

handlers.delete = (request, response) => {
    const {idDelete} = request.body;
    console.log(idDelete);
    const db = JSON.parse(helpers.readFile(config.playersLocation));
    
    db.players = [...helpers.delete(idDelete, db.players)];

    helpers.writeFile(config.playersLocation, JSON.stringify(db), ()=>{
        response.end('Fine!');
    });
}

module.exports = handlers;