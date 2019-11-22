const Identifiable = require('./Identifiable');


class Player extends Identifiable{
    constructor(id, name, vocation, level, city, sex, quests){
        super(id, name);
        this.vocation = vocation;
        this.level = level;
        this.city = city;
        this.sex = sex;
        this.quests = quests;
    }
}

module.exports = Player;