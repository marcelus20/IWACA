const Identifiable = require('./Identifiable');
const SchemaProperty = require('./SchemaProperty');


class Quest extends Identifiable{
    constructor(id, name, dateCompleted){
        super(id, name);
        this.dateCompleted = dateCompleted;
    }

    static getCorrespondentSchema(){
        const schema = super.getCorrespondentSchema();
        schema.id = "QuestSchema";
        schema.properties.dateCompleted = new SchemaProperty("string", true);
        return schema;
    }
}

module.exports = Quest;