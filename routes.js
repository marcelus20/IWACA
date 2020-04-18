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
router.get('/', (req, res) => {
    const header = {
            'Content-Type': 'text/html'
    }
    const doc = fs.readFileSync('frontend/index.html', 'utf-8');

    res.end(doc);
});
router.get('/api/v2', mainController.selectEverything);
router.get('/api/v2/players', playerController.getPlayers);
router.get('/api/v2/player/:id', playerController.getPlayer);
router.get('/api/v2/cities', cityController.getCities);
router.get('/api/v2/city/:id', cityController.getCity);
router.get('/api/v2/vocations', vocationController.getVocations);
router.get('/api/v2/images', imageCtrl.getImages);
router.get('/api/v2/image/:id', imageCtrl.getImage);
router.get('/api/v2/vocation', vocationController.getVocation);
router.post('/api/v2/player', playerController.createPlayer);
router.post('/api/v2/images', upload.single('image'), imageCtrl.uploadImage);
router.post('/api/v2/city', cityController.createCity);
router.post('/api/v2/vocation', vocationController.createVocation);
//updating
router.put('/player/:id', playerController.updatePlayer);
router.put('/city/:id', cityController.updateCity);
router.put('/vocation/:id', vocationController.updateVocation);
//router delete
router.delete('/player/:id', playerController.deletePlayer);
router.delete('/city/:id', cityController.deleteCity);
router.delete('/vocation/:id', vocationController.updateVocation);
router.delete('/api/v2/images/:id', imageCtrl.deleteImage);







module.exports = router;