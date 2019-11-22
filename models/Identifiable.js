class Identifiable{
    constructor(id, name){
        this.id = id;
        this.name = name;
    }

    static getCorrespondentSchema(){
        return {
            "id":"/SimpleIdentifiable",
            "type": "object",
            "properties":{
                "id": {
                    "type" : "string",
                    "required": true,
                    "minLength": 20,
                    "maxLength": 20
                },
                "name":{
                    "type": "string",
                    "required": true
                }
            }
        };
    }
}

module.exports = Identifiable;