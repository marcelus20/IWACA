const Identifiable = require('./Identifiable');
const SchemaProperty = require('./SchemaProperty');


class Player extends Identifiable{
    constructor(id, name, vocation, level, city, sex, quests){
        super(id, name);
        this.vocation = vocation;
        this.level = level;
        this.city = city;
        this.sex = sex;
        this.quests = quests;
    }

    static getCorrespondentSchema(){
        const schema = super.getCorrespondentSchema();
        schema.id = "PlayerSchema";
        schema.properties.vocation = new SchemaProperty("string", true);
        schema.properties.level = new SchemaProperty("number", true);
        schema.properties.city = new SchemaProperty("string", false);
        schema.properties.sex = new SchemaProperty("string", true);
        schema.properties.sex.maxLength = 1;
        schema.properties.quests = new SchemaProperty("array", false);
        schema.properties.quests.items = {type: "string", maxLength: 20};
        return schema
    }
}

module.exports = Player;