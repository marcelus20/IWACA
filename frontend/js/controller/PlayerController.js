
/**
 * This class is for the front end handles the AJAX calls by using the fetch API. 
 * 
 * I made it singleton. 
 */
class Controller {

    static controller;//the singleton instance

    constructor(){
    }

    /**
     * Initializing singleton
     */
    static init() {
        if (this.controller == null) this.controller = new Controller();
        else return this.controller;
        return this.controller;
    }

    /**
     * Sends requests to /players
     * @param {} callback 
     */
    getPlayers (callback){
        $.ajax({
            url: "/api/v2/players",
            type: 'GET',
            dataType: 'json', 
            success: callback
        });
    }

    

    /**
     * Sends requests to /vocations
     * @param {*} callback 
     */
    getVocations(callback){
        $.ajax({
            url: "/api/v2/vocations",
            type: 'GET',
            dataType: 'json', 
            success: callback
        });
    }


    /**
     * Sends requests to /player by POST
     * @param {*} form 
     * @param {*} callback 
     */
    createPlayer(player, callback1, callback2){

        $.ajax({
            type: "POST",
            url: `/api/v2/player`,
            data: player,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback1,
            error: callback2
        });
    }

    /**
     * Sends requests to /player by DELETE
     * @param {} id 
     * @param {*} callback 
     */
    deletePlayer(id, callback1, callback2){
        $.ajax({
            type: "DELETE",
            url: `/api/v2/player/${id}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback1,
            error: callback2
        });
    }

    /**
     * Sends requests to /player by PUT
     * @param {*} player 
     * @param {*} callback 
     */
    updatePlayer(player, id, callback1, callback2){
        $.ajax({
            type: "PUT",
            url: `/api/v2/player/${id}`,
            data: JSON.stringify(player),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback1,
            error: callback2
        });
    }




    
}




