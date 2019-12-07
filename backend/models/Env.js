/**
 * Module that stores port and type of enviroment. Staging 3000
 */

class Env{
    constructor(environment, port){
        this.environment = environment;
        this.port = port;
    }
}

module.exports = Env;