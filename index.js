/**
 * Felipe Mantovani 2017192 CA IWA
 */
const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const xmlParse = require('xslt-processor').xmlParse;
const xslProcess_ = require('xslt-processor').xsltProcess;
const config = require('./config');

const router = express();
const server = http.createServer(router);

const Player = require('./models/Player');
const Quest = require('./models/Quest');


router.get('/', (request, response)=>{
    const header = {
        'Content-Type': 'text/html'
    }

    response.writeHead(200, header);

    // const fileXml = fs.readFileSync('PaddysCafe.xml', 'utf-8');
    // const fileXls = fs.readFileSync('PaddysCafe.xsl', 'utf-8');


    // const doc = xmlParse(fileXml);
    // const stylesheet = xmlParse(fileXls);



    // let result = xslProcess_(doc, stylesheet);

    // result = result.toString();

    response.end("<html><body>ABC</body></html>");
});

server.listen(config.env.port, process.env.IP, ()=>{
    console.log(`Running on ${config.env.port} in the ${config.env.environment} environment`);
})
