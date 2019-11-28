const Env = require('../models/Env');

const config = {
    "env": new Env('staging', 3000),
    "playersLocation":".database/players.xml",
    "questsLocation":".database/quests.xml",
    "schemaLocation":".database/schema.xsd",
    "xslIndexLocation":"index.xsl",
    "xslQuestLocation":"quests.xsl"
}


module.exports = config;