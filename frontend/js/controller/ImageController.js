


const ImageController = class {


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
     * Sends requests to /cities
     * @param {} callback 
     */
    getImages(callback){
        $.ajax({
            url: "/api/v2/images",
            type: 'GET',
            dataType: 'json', 
            success: callback
        });
    }


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
     * Sends requests to /player by DELETE
     * @param {} id 
     * @param {*} callback 
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