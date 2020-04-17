const Player = require('../models/player.js');

exports.createPlayer = (req, res) => { 
    var newPlayer = new Player(req.body);
    newPlayer.save(function (err, player) { 
        if (err) { 
            res.status(400).json(err);
        }

        res.json(player); 
});
};

exports.getPlayers = (req, res) => {
  Player.find({}, function (err, players) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(players);
  }); 
};

exports.getPlayer = (req, res) => {
  Player.findOne({_id: req.params.id}, function (err, player) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(player);
  }); 
};

exports.updatePlayer = (req, res) => {
  Player.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},function (err, player) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(player);
  }); 
};

exports.deletePlayer = (req, res) => {
  Player.findByIdAndRemove(req.params.id, function (err, player) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(player);
  }); 
};