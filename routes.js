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





router.use(express.json());
router.use(express.static(path.join(__dirname, 'frontend')));
router.use(express.json());
router.use(expAutoSan.allUnsafe);

const home = (req, res) => {
    const header = {
            'Content-Type': 'text/html'
    }
    const doc = fs.readFileSync('frontend/index.html', 'utf-8');

    res.end(doc);
}

router.get('/', home);
router.get('/api/v2', mainController.selectEverything);
router.get('/api/v2/players', playerController.getPlayers);
router.get('/api/v2/player/:id', playerController.getPlayer);
router.get('/api/v2/cities', cityController.getCities);
router.get('/api/v2/city/:id', cityController.getCity);
router.get('/api/v2/vocations', vocationController.getVocations);
router.get('/api/v2/vocation/:id', vocationController.getVocation);
router.get('/api/v2/images', imageCtrl.getImages);
router.get('/api/v2/image/:id', imageCtrl.getImage);
router.get('/api/v2/vocation', vocationController.getVocation);
router.post('/api/v2/player', playerController.createPlayer);
router.post('/api/v2/image', upload.single('image'), imageCtrl.uploadImage);
router.post('/api/v2/city', cityController.createCity);
router.post('/api/v2/vocation', vocationController.createVocation);
//updating
router.put('/api/v2/player/:id', playerController.updatePlayer);
router.put('/api/v2/city/:id', cityController.updateCity);
router.put('/api/v2/vocation/:id', vocationController.updateVocation);
//router delete
router.delete('/api/v2/player/:id', playerController.deletePlayer);
router.delete('/api/v2/city/:id', cityController.deleteCity);
router.delete('/api/v2/vocation/:id', vocationController.deleteVocation);
router.delete('/api/v2/image/:id', imageCtrl.deleteImage);







module.exports = router;