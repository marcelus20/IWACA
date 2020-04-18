const express = require('express');
const router = express.Router();
const playerController = require('./controllers/playerController.js');
const cityController = require('./controllers/cityController');



//routers get
// router.use(express.static(path.join(__dirname, 'frontend')));
router.use(express.json());
// router.use(expAutoSan.allUnsafe);

// router.get('/', handlers.main);
router.get('/players', playerController.getPlayers);
router.get('/player/:id', playerController.getPlayer);
router.get('/cities', cityController.getCities);
router.get('/city/:id', cityController.getCity);
// router.get('/vocations', handlers.vocations);


//router post player and players will map to the same callback
router.post('/player', playerController.createPlayer);
router.post('/players', playerController.createPlayer);
router.post('/city', cityController.createCity);

//updating
router.put('/player/:id', playerController.updatePlayer);
router.put('/city/:id', cityController.updateCity);

//router delete
router.delete('/player/:id', playerController.deletePlayer);
router.delete('/city/:id', cityController.deleteCity);



module.exports = router;