/**
 * This is the frontend city controller
 * This class is responsible for sending requests to the API
 * Felipe Mantovani 2017192
 * All controllers are singleton
 * The client of this controller is the scripts.js file
 */

const CityController = class {


    static instance;//singleton instance

    constructor(){

    }

    /**
     * Get instance methodd
     */
    static getInstance(){
        if(CityController.instance == null){
            CityController.instance = new CityController();
        }
        return CityController.instance;
    }

    /**
     * Sends requests to /cities
     * @param {Function} callback 
     */
    getCities(callback){
        $.ajax({
            url: "/api/v2/cities",
            type: 'GET',
            dataType: 'json', 
            success: callback
        });
    }


    /**
     * Sends request POST to /city
     * @param {City} city 
     * @param {Function} callback1 
     * @param {Function} callback2 
     */
    createCity(city, callback1, callback2){
        $.ajax({
            type: "POST",
            url: `/api/v2/city`,
            data: city,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback1,
            error: callback2
        });
    }

    /**
     * Sends requests to /player by DELETE
     * @param {String} id 
     * @param {Function} callback 
     */
    deleteCity(id, callback){
        $.ajax({
            type: "DELETE",
            url: `/api/v2/city/${id}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback
        });
    }

    /**
     * Sends requests to /player by PUT
     * @param {Player} player 
     * @param {Function} callback 
     */
    updateCity(city, id, callback1, callback2){
        $.ajax({
            type: "PUT",
            url: `/api/v2/city/${id}`,
            data: JSON.stringify(city),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback1,
            error: callback2
        });
    }

    /**
     * Sends request to /cityIsAssociatedWithAPlayer path
     * @param {String} id 
     * @param {Function} callback1 
     * @param {Function} callback2 
     */
    cityIsAssociatedWithAPlayer(id, callback1, callback2){
        $.ajax({
            url: "/api/v2/cityIsAssociatedWithAPlayer/"+id,
            type: 'GET',
            dataType: 'json', 
            success: callback1,
            callback2: callback2
        });
    }

}