
/**
Felipe Mantovani 2917192
 */
const Player = require('../models/player.js');//nodel utilised by this PLayer


// create a a new player routing
exports.createPlayer = (req, res) => { 
    var newPlayer = new Player(req.body);
    newPlayer.save(function (err, player) { 
        if (err) { 
            res.status(400).json(err);
        }

        res.json(player); 
    });
};


//get the list of players recorded to db
exports.getPlayers = (req, res) => {
  Player.find({}, function (err, players) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(players);
  }); 
};

//The a single player by a given ID
exports.getPlayer = (req, res) => {
  Player.findOne({_id: req.params.id}, function (err, player) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(player);
  }); 
};

//update the adetails of a existing player
exports.updatePlayer = (req, res) => {
  Player.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},function (err, player) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(player);
  }); 
};

//delete a existing player
exports.deletePlayer = (req, res) => {
  Player.findByIdAndRemove(req.params.id, function (err, player) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(player);
  }); 
};