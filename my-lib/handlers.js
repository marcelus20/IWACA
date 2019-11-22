const xmlParse = require('xslt-processor').xmlParse;
var xml = require("js2xmlparser");
const fs = require('fs');
const xslProcess_ = require('xslt-processor').xsltProcess;
const config = require('../my-lib/config');


handlers = {};

handlers.main = (request, response) => {
    handlers.players(request, response);
}

handlers.players = (request, response) => {
    const header = {
            'Content-Type': 'text/html'
    }
    response.writeHead(200, header);

    const database = JSON.parse(fs.readFileSync(config.dataLocation, 'utf-8'));
    const fileXls = fs.readFileSync(config.xslIndexLocation, 'utf-8');
    const quests = database.quests.map(quest=>helpers.destructObjectToQuest(quest));

    const players = database.players
        .map(player=>helpers.destructObjectToPlayer(player))
        .map(player=>helpers.assignQuestById(player, quests));
    
    const doc = xmlParse(xml.parse("players",{"player" : players}));
    const stylesheet = xmlParse(fileXls);
    const result = xslProcess_(doc, stylesheet).toString();
    response.end(result);
}

handlers.quests = (request, response) => {
    const header = {
            'Content-Type': 'text/html'
    }
    response.writeHead(200, header);

    const database = JSON.parse(fs.readFileSync(config.dataLocation, 'utf-8'));
    const fileXls = fs.readFileSync(config.xslQuestLocation, 'utf-8');
    const quests = database.quests.map(quest=>helpers.destructObjectToQuest(quest));
    
    const doc = xmlParse(xml.parse("quests",{"quest" : quests}));
    const stylesheet = xmlParse(fileXls);
    const result = xslProcess_(doc, stylesheet).toString();
    response.end(result);
}

module.exports = handlers;