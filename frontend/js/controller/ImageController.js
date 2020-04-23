
/**
 * This is the controller responsible for sending request to image routings
 * Felipe Mantovani 2017192
 * 
 */

const ImageController = class {

    /**
     * Singleton instance
     */
    static instance;

    constructor(){

    }

    static getInstance(){
        if(ImageController.instance == null){
            ImageController.instance = new ImageController();
        }
        return ImageController.instance;
    }

    /**
     * Sends requests to /images
     * @param {Function} callback 
     */
    getImages(callback){
        $.ajax({
            url: "/api/v2/images",
            type: 'GET',
            dataType: 'json', 
            success: callback
        });
    }

    /**
     * Sends GET request to isVocationRelated. 
     * @param {String} id 
     * @param {Function} callback1 //success handling
     * @param {Function} callback2 //error handling
     */
    isVocationRelated(id, callback1, callback2){
        $.ajax({
            url: `/api/v2/isVocationRelated/${id}`,
            type: 'GET',
            dataType: 'json', 
            success: callback1,
            error: callback2
        });
    }


    /**
     * Sends the POST request to the /image rounting.
     * @param {FormData} data 
     * @param {Function} callback1 //success handling
     * @param {Function} callback2 //error handling
     */
    createImage(data, callback1, callback2){
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/api/v2/image",
            data: data,
            processData: false, //prevent jQuery from automatically transforming the data into a query string
            contentType: false,
            cache: false,
            success: callback1,
            error: callback2
        });
    }

    /**
     * Sends DELETE request to /image
     * @param {String} id 
     * @param {Function} callback1 //success handler
     * @param {Function} callback2 //error handler
     */
    deleteImage(id, callback1, callback2){
        $.ajax({
            type: "DELETE",
            url: `/api/v2/image/${id}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback1,
            failiure: callback1
        });
    }

   

}