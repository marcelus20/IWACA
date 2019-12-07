/**
 * This config object will store info about the location of files that are relevant to read and manipulate.
 */

const Env = require('../models/Env');

const config = {
    "env": new Env('staging', 3000),
    "playersLocation":"backend/.database/players.json",
    "schemaLocation":"backend/.database/player-schema.json",
    "xslIndexLocation":"frontend/index.html",
}


module.exports = config;