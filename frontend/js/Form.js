
class Form{
    constructor(name, level, vocation, city, sex){
        this.name = name;
        this.level = level;
        this.vocation = vocation;
        this.city = city;
        this.sex = sex;
    }

    isValid(){
        return this.name.length >= 3 &&
        !isNaN(this.level) && Number.parseInt(this.level) >= 0 &&
        this.vocation.length > 0 && typeof this.vocation == 'string' &&
        this.city.length > 0 && typeof this.city == 'string' &&
        this.sex.length == 1 && typeof this.sex == 'string';
    }

}

const form = ({name, level, vocation, city, sex}) => new Form(name, level, vocation, city, sex);