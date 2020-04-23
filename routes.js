/**
 * Felipe Mantovani 2017192
 */

//importing all of the dependencies allong with the controller classes (backend controller classes)
const express              = require('express');
const router               = express.Router();
const playerController     = require('./controllers/playerController.js');
const cityController       = require('./controllers/cityController');
const vocationController   = require('./controllers/vocationController');
const mainController       = require('./controllers/mainController');
const fs                   = require('fs');
const expAutoSan           = require('express-autosanitizer');
const path                 = require('path');
var multer                 = require('multer');
module.exports.UPLOAD_PATH = 'uploads';
const upload               = multer( { dest: module.exports.UPLOAD_PATH });
const imageCtrl            = require('./controllers/imageController');




//assigning middlewares to the expresss object
router.use(express.json());
router.use(express.static(path.join(__dirname, 'frontend')));
router.use(express.json());
router.use(expAutoSan.allUnsafe);


/**
 * This function is to be mapped to the / url. Leads visitor to the home page. (Delivers the index.html file)
 * 
 * @param { Request } req 
 * @param { Request } res 
 */
const home = (req, res) => {
    const header = {
            'Content-Type': 'text/html'
    }
    const doc = fs.readFileSync('frontend/index.html', 'utf-8');
    res.end(doc);
}

//GET routers
router.get('/', home);
router.get('/api/v2', mainController.selectEverything); // Select all tables in a single object (except images)
router.get('/api/v2/players', playerController.getPlayers); // gets the list of players in the mongo DB
router.get('/api/v2/player/:id', playerController.getPlayer);//gets a single player by an id
router.get('/api/v2/cities', cityController.getCities); // gets the list of cities recorded to the db
router.get('/api/v2/city/:id', cityController.getCity); // gets a single city by an id
router.get('/api/v2/vocations', vocationController.getVocations); // gets all vocations recorded
router.get('/api/v2/vocation/:id', vocationController.getVocation); // gets a vocation by a single ID
router.get('/api/v2/images', imageCtrl.getImages); // get the list of images (in form of object data, not the actual image)
router.get('/api/v2/image/:id', imageCtrl.getImage); // get a single image by an ID (the actual image is sent over)
router.get('/api/v2/correspondentImage/:vocationId', imageCtrl.getVocationCorrespondentImage);//gets an image associated with a vocation. I
router.get('/api/v2/isVocationRelated/:imageId', imageCtrl.isVocationRelated);// checks if image ID is being used (associated with a vocation)
router.get('/api/v2/defaultVocationRelated/', vocationController.defaultVocationRelated);// Gets the default vocation related image (for vocations created by the user, not vocations default of the system)
router.get('/api/v2/checkIfVocationIsDefault/:vocationId', vocationController.checkIfVocationIsDefault); // checks if the ID passed is associated with a default vocation
router.get('/api/v2/isAssociatedWithAPlayer/:vocationId', vocationController.isAssociatedWithAPlayer); // checks if a vocation is being used by a player (to prevent from deleting)
router.get('/api/v2/cityIsAssociatedWithAPlayer/:cityId', cityController.cityIsAssociatedWithAPlayer); // check if city is associated with a player (to prevent from deleting)
//POST routers
router.post('/api/v2/player', playerController.createPlayer);//creates a new player
router.post('/api/v2/image', upload.single('image'), imageCtrl.uploadImage); // creates (upload) a new image
router.post('/api/v2/city', cityController.createCity); // creates a new city
router.post('/api/v2/vocation', vocationController.createVocation); // creates a new vocation
//updating
router.put('/api/v2/player/:id', playerController.updatePlayer); // updates an existing player
router.put('/api/v2/city/:id', cityController.updateCity); // updates an existing city
router.put('/api/v2/vocation/:id', vocationController.updateVocation); // updates an existing vocation
//router delete
router.delete('/api/v2/player/:id', playerController.deletePlayer); // deletes a player
router.delete('/api/v2/city/:id', cityController.deleteCity); // deletes a city
router.delete('/api/v2/vocation/:id', vocationController.deleteVocation); // deletes a vocation
router.delete('/api/v2/image/:id', imageCtrl.deleteImage); // deletes an image


//If path is anythig else but the routes above declared, send this not found response
const notFoundPath = (req, res) => {
    res.status(404).send({"message": "Path doesn`t exist"});
}
router.get('/*', notFoundPath);
router.post('/*', notFoundPath);
router.put('/*', notFoundPath);
router.delete('/*', notFoundPath);




module.exports = router;