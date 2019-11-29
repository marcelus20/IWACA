const Env = require('../models/Env');

const config = {
    "env": new Env('staging', 3000),
    "playersLocation":"backend/.database/players.json",
    "schemaLocation":"backend/.database/schema.json",
    "xslIndexLocation":"frontend/index.html",
}


module.exports = config;