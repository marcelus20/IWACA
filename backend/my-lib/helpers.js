const libxmljs = require('libxmljs');
const xmlParse = require('xslt-processor').xmlParse;
const fs = require('fs');
const config = require('./config')
const xml2json = require('xml2json');
var validate = require('jsonschema').validate;



helpers = {};


helpers.validateSchema = (instance, schema) => {
    schema = typeof schema == 'string'? JSON.parse(schema): schema;
    return validate(instance, schema).valid;
}


helpers.readFile = (path) => fs.readFileSync(path, 'utf-8');


helpers.writeFile = (dir, content, callback) => {
   fs.writeFileSync(dir, content, {flag: 'w'});
   callback();
};

helpers.delete = (id, arr) =>{
    const index = helpers.search(id, arr);
    if(index < 0) return false;
    arr.splice(index, 1);
    return [...arr];
}

helpers.search = (id, arr) => {
    let index = 0;
    for(player of arr){
        if (player.id == id) return index;
        index++;
    }
    return -1;
}



helpers.genRandomChars = (len) =>{
    const chars = [
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u',
    'v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
    'Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0'
    ]
    let str = "";
    for(let i = 0; i < len; i++){
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

module.exports = helpers;