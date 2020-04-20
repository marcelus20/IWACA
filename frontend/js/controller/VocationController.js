

const VocationController = class {


    static instance;

    constructor(){

    }

    static getInstance(){
        if(VocationController.instance == null){
            VocationController.instance = new VocationController();
        }
        return VocationController.instance;
    }

    /**
     * Sends requests to /cities
     * @param {} callback 
     */
    getVocations(callback){
        $.ajax({
            url: "/api/v2/vocations",
            type: 'GET',
            dataType: 'json', 
            success: callback
        });
    }


    createVocation(vocation, callback){
        $.ajax({
            type: "POST",
            url: `/api/v2/vocation`,
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
    deleteVocation(id, callback){
        $.ajax({
            type: "DELETE",
            url: `/api/v2/vocation/${id}`,
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
    updateVocation(vocation, id, callback){
        $.ajax({
            type: "PUT",
            url: `/api/v2/vocation/${id}`,
            data: JSON.stringify(vocation),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback
        });
    }

}