/**
 * Felipe Mantovani 2017192 CA IWA
 */

 //NPM modules
const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const xmlParse = require('xslt-processor').xmlParse;
// const jsonxml = require('jsontoxml');
var xml = require("js2xmlparser");

const xslProcess_ = require('xslt-processor').xsltProcess;
const Validator = require('jsonschema').Validator;


//My own libraries
const config = require('./my-lib/config');
const helpers = require('./my-lib/helpers');



//My pojo classes
const Player = require('./models/Player');
const Quest = require('./models/Quest');



const v = new Validator();
const router = express();
const server = http.createServer(router);



router.get('/', (request, response)=>{
    const header = {
        'Content-Type': 'text/html'
    }

    response.writeHead(200, header);

    const database = JSON.parse(fs.readFileSync(config.dataLocation, 'utf-8'));
    const quests = database.quests.map(quest=>helpers.destructObjectToQuest(quest));

    const players = database.players
        .map(player=>helpers.destructObjectToPlayer(player))
        .map(player=>helpers.assignQuestById(player, quests));
    
 


    // const doc = xmlParse(fileXml);
    // const stylesheet = xmlParse(fileXls);



    // let result = xslProcess_(doc, stylesheet);

    // result = result.toString();

    response.end(xml.parse("playersList",players));
    console.log(xml.parse("players",{"player" : players}));
});

server.listen(config.env.port, process.env.IP, ()=>{
    console.log(`Running on ${config.env.port} in the ${config.env.environment} environment`);
})
