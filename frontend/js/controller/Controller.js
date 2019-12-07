
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
        fetch('/players')
        .then(response=>response.text())
        .then(text => {      
            const {data, render} = JSON.parse(text);
            state.render = render
            state.players = [...data];
            callback();
        });
    }

    /**
     * Sends requests to /cities
     * @param {} callback 
     */
    getCities(callback){
        fetch('/cities')
        .then(response=> response.text())
        .then(json=>{
            state.cities = JSON.parse(json);
            callback();
        });
    }

    /**
     * Sends requests to /vocations
     * @param {*} callback 
     */
    getVocations(callback){
        
        fetch('/vocations')
            .then(response=> response.text())
            .then(json=>{
                state.vocations = JSON.parse(json);
                callback();
        });
    }


    /**
     * Sends requests to /player by POST
     * @param {*} form 
     * @param {*} callback 
     */
    createPlayer(form, callback){
        fetch('/player', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(form)
        }).then(res=>res.text())
            .then(text=>{
                if(text === 'true'){
                    showSuccessAlert("Player added successfully. Please, scroll table to see the record in the last row");
                    this.getPlayers((callback));
                }else{
                    showErrorAlert("Schema does not match or something else went wrong");
                }      
            });
    }

    /**
     * Sends requests to /player by DELETE
     * @param {} id 
     * @param {*} callback 
     */
    deletePlayer(id, callback){
        const id_ = id.trim();
        fetch(`/player?id=${id_}`, {
            method: "DELETE",
        }).then(res=>res.text())
        .then(text=>{
            if(text === 'false'){
                showErrorAlert('Id does not exist');
            }else{
                this.getPlayers(callback);
                showSuccessAlert('Player successfully deleted!');
            }       
        });
    }

    /**
     * Sends requests to /player by PUT
     * @param {*} player 
     * @param {*} callback 
     */
    updatePlayer(player, callback){
        fetch('/player',{
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            },
            method:'PUT',
            body:JSON.stringify(player),
        }).then(res=>res.text())
                .then(text=>{
                    if(text == 'true'){
                        showSuccessAlert("Player updated sucesssfuly");
                        this.getPlayers(()=>callback());
                    }else{
                        showErrorAlert("Something went wrong. Deletion did not complete");
                    }
                });
    }




    
}




