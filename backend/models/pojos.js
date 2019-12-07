/**
 * 
 * This is where classes that store data will be ancapsulated.
 * POJO has the Players class and DataStatus class. 
 * 
 * Player is to create instances of it before storing to DB, this way, it is garanteed that the order of
 * attributes follows the schema
 */


const pojo = {};



pojo.Player = class{
    constructor(id, name, level, vocation, city, sex){
        this.id = id;
        this.name = name;
        this.level = level;
        this.vocation = vocation;
        this.city = city;
        this.sex = sex;
    }
}

pojo.DataStatus = class {
    constructor(data, render){
        this.data = data;
        this.render = render;
    }
}




module.exports =  pojo;