const Player = require('../models/Player');
const Quest = require('../models/Quest');

helpers = {};

helpers.destructObjectToPlayer = (obj)=> {
    const {id, name, vocation, level, city, sex, quests} = obj;
    return new Player(id, name, vocation, level, city, sex ,quests);
}

helpers.destructObjectToQuest = (obj)=> {
    const {id, name, dateCompleted} = obj;
    return new Quest(id, name, dateCompleted);
}

helpers.checkSchemaValidity = (instances, validator, schema) => {
    return instances.map(instance => validator.validate(instance, schema).valid).reduce((acc, item)=> acc && item);
}

helpers.checkSchema = (instances, v, schema) => {
    instances.forEach(instance => console.log(v.validate(instance, schema)));
}

helpers.assignQuestById = (player, quests_) => {
    return new Player(player.id, player.name, player.vocation, player.level, player.city, player.sex, player.quests
        .map(id=>quests_
            .filter(quest=>quest.id == id)[0]));
        
}



module.exports = helpers;