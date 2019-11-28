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

    const players = fs.readFileSync(config.playersLocation, 'utf-8');
    const fileXls = fs.readFileSync(config.xslIndexLocation, 'utf-8');
    const schema = fs.readFileSync(config.schemaLocation, 'utf-8');
    const doc = helpers.validateSchema(schema, players)?xmlParse(players):false;
    const stylesheet = xmlParse(fileXls);
    const result = doc?xslProcess_(doc, stylesheet).toString():"<html><body>invalid</body></html>";
    response.end(result);
}

handlers.quests = (request, response) => {
    const header = {
            'Content-Type': 'text/html'
    }
    response.writeHead(200, header);

    
    const fileXls = fs.readFileSync(config.xslQuestLocation, 'utf-8');
    const quests = fs.readFileSync(config.questsLocation, 'utf-8');
    
    const doc = xmlParse(quests);
    const stylesheet = xmlParse(fileXls);
    const result = xslProcess_(doc, stylesheet).toString();
    response.end(result);
}

module.exports = handlers;