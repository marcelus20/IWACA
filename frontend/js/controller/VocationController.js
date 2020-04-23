
/**
 * Controller responsible for communicating with the API
 */
const VocationController = class {


    /**
     * Singleton instance
     */
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
     * Sends GET request to /vocations
     * @param {Function} callback 
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
     * Sends POST request to /vocation
     * @param {Vocation} vocation 
     * @param {Function} callback1 //success handler
     * @param {Function} callback2 //error handler
     */
    createVocation(vocation, callback1, callback2){
        $.ajax({
            type: "POST",
            url: `/api/v2/vocation`,
            data: vocation,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback1,
            error: callback2
        });
    }

    /**
     * Sends requests to /player by DELETE
     * @param {String} id 
     * @param {Function} callback1 //success handler
     * @param {Function} callback2 //success handler
     */
    deleteVocation(id, callback1, callback2){
        $.ajax({
            type: "DELETE",
            url: `/api/v2/vocation/${id}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback1,
            error : callback2
        });
    }

    /**
     * Sends requests to /vocation by PUT
     * @param {String} id 
     * @param {Vocation} vocation 
     * @param {Function} callback 
     * @param {Function} callback 
     */
    updateVocation(vocation, id, callback1, callback2){
        $.ajax({
            type: "PUT",
            url: `/api/v2/vocation/${id}`,
            data: JSON.stringify(vocation),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback1,
            error: callback2
        });
    }

    /**
     * Sends a request to checkIfVocationIsDefault routing path
     * @param {String} id 
     * @param {Function} callback1 
     * @param {Function} callback2 
     */
    checkIfVocationIsDefault(id, callback1, callback2){
        $.ajax({
            url: "/api/v2/checkIfVocationIsDefault/"+id,
            type: 'GET',
            dataType: 'json', 
            success: callback1,
            error:callback2
        });
    }

     /**
     * Sends a request to defaultVocationRelated routing path
     * @param {Function} callback1 
     * @param {Function} callback2 
     */
    defaultVocationRelated(callback1, callback2){
        $.ajax({
            url: "/api/v2/defaultVocationRelated",
            type: 'GET',
            dataType: 'json', 
            success: callback1,
            error: callback2
        });
    }

     /**
     * Sends a request to isAssociatedWithAPlayer routing path
     * @param {String} id 
     * @param {Function} callback1 
     * @param {Function} callback2 
     */
    isAssociatedWithAPlayer(id, callback1, callback2){
        $.ajax({
            url: "/api/v2/isAssociatedWithAPlayer/" + id,
            type: 'GET',
            dataType: 'json', 
            success: callback1,
            error: callback2
        });
    }

}