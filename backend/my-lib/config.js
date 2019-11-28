const Env = require('../models/Env');

const config = {
    "env": new Env('staging', 3000),
    "playersLocation":"backend/.database/players.xml",
    "questsLocation":"backend/.database/quests.xml",
    "schemaLocation":"backend/.database/schema.xsd",
    "xslIndexLocation":"frontend/index.xsl",
    "xslQuestLocation":"frontend/quests.xsl"
}


module.exports = config;