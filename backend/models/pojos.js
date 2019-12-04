
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