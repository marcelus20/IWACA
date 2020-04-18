const express            = require('express');
const router             = express.Router();
const playerController   = require('./controllers/playerController.js');
const cityController     = require('./controllers/cityController');
const vocationController = require('./controllers/vocationController');
const mainController     = require('./controllers/mainController');

router.use(express.json());
router.get('/api/v2', mainController.selectEverything);
router.get('/api/v2/players', playerController.getPlayers);
router.get('/api/v2/player/:id', playerController.getPlayer);
router.get('/api/v2/cities', cityController.getCities);
router.get('/api/v2/city/:id', cityController.getCity);
router.get('/api/v2/vocations', vocationController.getVocations);
router.get('/api/v2/vocation', vocationController.getVocation);
router.post('//api/v2player', playerController.createPlayer);
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



module.exports = router;