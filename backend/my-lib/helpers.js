const libxmljs = require('libxmljs');
const fs = require('fs');
const config = require('./config')

helpers = {};

//@TODO needs looking after (returning the correct schema)
helpers.validateSchema = (xsdFile, xmlFile) => {
    const xsdDoc = libxmljs.parseXmlString(xsdFile);
    const xmlDoc = libxmljs.parseXmlString(xmlFile);
    console.log(xmlDoc.validationErrors);
    return true;//xmlDoc.validate(xsdDoc);
}

module.exports = helpers;