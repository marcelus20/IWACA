/**
 * Code retrieved from the professors template. It's been partially modified by me (Felipe Mantovani 2017192)
 * Author: Mikhail 
 * */

var UPLOAD_PATH = require('../routes').UPLOAD_PATH;
const Vocation = require('../models/vocation');
var Image = require('../models/image');
var path = require('path');
const fs = require('fs');
const del = require('del');

exports.uploadImage = function(req, res) {

    console.log(req.file);
    let newImage = new Image();
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalname;
    newImage.desc = req.body.desc;
    newImage.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        res.status(201).send({ newImage });
    });
    
};



exports.getImages = function(req, res) {
    Image.find({}, '-__v')
    .lean()
    .exec((err, images) => {
        if (err) {
            return res.sendStatus(400);
        }

        for (let i = 0; i < images.length; i++) {
            var img = images[i];
            img.url = req.protocol + '://' + req.get('host') + '/images/' + img._id;
        }

        res.json(images);
    });
};

//this function will return the image based on the res
exports.getVocationCorrespondentImage = (req, res) => {
    vocationId = req.params.vocationId;
    //first look for the full vocation object with this id
    Vocation.findOne({_id: vocationId}, function (err, vocation) {
        if (err) {
        res.status(400).json(err);
        } 
        let imgId = req.params.id;
        //then get the attribute image of it and search for the image.
        Image.findById(vocation.image._id, (err, image) => {
            if (err) {
                return res.sendStatus(400);
            }
                res.setHeader('Content-Type', 'image/jpeg');
                fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
            });
        }); 
}

//should return an object containing a key "vocationRelated" with a value of either true or false.
//This routing is to validate which images should be deleted. Vocation related images should never be deleted.
//Only images user uploaded
exports.isVocationRelated = (req, res) =>{
    //first, get the array of vocations and map it only to the image attributes of each:
    Vocation.find({}, function (err, vocations) {
        if (err) {
            res.status(400).json(err);
        } 
        //Once array is retrieved, map it to an array of images ID
        const vocationImagesId = vocations.map(vocation=>vocation.image);
        //include the defaul vocation images (vocations that user creates);
        vocationImagesId.push('5e9f58593ce82b082803dff4');
        // vocationImagesId.forEach(id=>console.log(`${id} == ${req.params.imageId}`));
 
        //now check if the ID passed in the routing is included in the vocationImagesIdArray
        res.status(200).send({"vocationRelated": vocationImagesId.reduce((acc, current)=> req.params.imageId == current || acc, false)});
    });
};

exports.getImage = function(req, res)  {
    let imgId = req.params.id;

    Image.findById(imgId, (err, image) => {
        if (err) {
            return res.sendStatus(400);
        }

        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
    });
};

exports.deleteImage = function(req, res) {
    let imgId = req.params.id;

    Image.findByIdAndRemove(imgId, (err, image) => {
        if (err && image) {
            return res.sendStatus(400);
        }

        del([path.join(UPLOAD_PATH, image.filename)]).then(deleted => {
            res.status(200).send(deleted);
        });
    });
};