const express = require('express');
const router = express.Router();
const playerController = require('./controllers/playerController.js');



//routers get
// router.use(express.static(path.join(__dirname, 'frontend')));
router.use(express.json());
// router.use(expAutoSan.allUnsafe);

// router.get('/', handlers.main);
router.get('/players', playerController.getPlayers);
// router.get('/cities', handlers.cities);
// router.get('/vocations', handlers.vocations);


//router post player and players will map to the same callback
router.post('/player', playerController.createPlayer);
router.post('/players', playerController.createPlayer);

//updating
router.put('/player/:id', playerController.updatePlayer);

//router delete
router.delete('/player/:id', playerController.deletePlayer);


module.exports = router;