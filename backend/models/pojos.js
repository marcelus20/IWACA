
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




module.exports =  pojo;