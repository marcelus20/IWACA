const validate = require('jsonschema').validate;
const fs = require('fs');
const config = require('./config')


/**
 * Helpers are used to aid handlers on the request with business logic
 */

helpers = {};


/**
 * Returns true if matches schema or false otherwise
 */
helpers.validateSchema = (instance, schema) => {
    schema = typeof schema == 'string'? JSON.parse(schema): schema;
    return validate(instance, schema).valid;
}

/**
 * Returns a string of a file content by passing file location as parameter
 */
helpers.readFile = (path) => fs.readFileSync(path, 'utf-8');


/**
 * Writes content to file and triggers a callback function.
 * Usually when using POST or PUT that demands file modification.
 */
helpers.writeFile = (dir, content, callback) => {
   fs.writeFileSync(dir, content, {flag: 'w'});
   callback();
};

/**
 * It deletes the player that has the id passed. 
 */
helpers.delete = (id, arr) =>{
    const index = helpers.search(id, arr);
    if(index < 0) return false;
    arr.splice(index, 1);
    return [...arr];
}

/**
 * Searches player by the id given within the array given.
 */
helpers.search = (id, arr) => {
    let index = 0;
    for(player of arr){
        if (player.id == id) return index;
        index++;
    }
    return -1;
}


/**
 * Generate a bunch of random characters. This is exclusevily used for the ID generation of 20. 
 */
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