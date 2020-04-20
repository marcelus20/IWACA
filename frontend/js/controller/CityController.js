

const CityController = class {


    static instance;

    constructor(){

    }

    static getInstance(){
        if(CityController.instance == null){
            CityController.instance = new CityController();
        }
        return CityController.instance;
    }

    /**
     * Sends requests to /cities
     * @param {} callback 
     */
    getCities(callback){
        $.ajax({
            url: "/api/v2/cities",
            type: 'GET',
            dataType: 'json', 
            success: callback
        });
    }


    createCity(city, callback){
        $.ajax({
            type: "POST",
            url: `/api/v2/city`,
            data: city,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback
        });
    }

    /**
     * Sends requests to /player by DELETE
     * @param {} id 
     * @param {*} callback 
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
     * @param {*} player 
     * @param {*} callback 
     */
    updateCity(city, id, callback){
        $.ajax({
            type: "PUT",
            url: `/api/v2/city/${id}`,
            data: JSON.stringify(city),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback
        });
    }

}