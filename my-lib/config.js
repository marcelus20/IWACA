const Env = require('../models/Env');

const config = {
    "env": new Env('staging', 3000),
    "dataLocation":".database/data.json"
}


module.exports = config;