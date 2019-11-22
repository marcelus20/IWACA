const Env = require('../models/Env');

const config = {
    "env": new Env('staging', 3000),
    "dataLocation":".database/data.json",
    "xslIndexLocation":"index.xsl",
    "xslQuestLocation":"quests.xsl"
}


module.exports = config;