const Identifiable = require('./Identifiable');

class Quest extends Identifiable{
    constructor(id, name, dateCompleted){
        super(id, name);
        this.dateCompleted = dateCompleted;
    }
}

module.exports = Quest;