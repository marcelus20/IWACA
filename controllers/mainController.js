const Player = require('../models/player.js');
const City = require('../models/city.js');
const Vocation = require('../models/vocation.js');




exports.selectEverything = (req, res) => {
    const db = {};  
    City.find({}, function (err, cities) {
        if (err) {
        res.status(400).json(err); 
        }
        Player.find({}, function (err_, players) {
            if (err) {
            res.status(400).json(err_); 
            } 
            Vocation.find({}, function (err, vocations) {
            if (err) {
                res.status(400).json(err); 
            } 
            db.cities = cities;
            db.vocations = vocations;
            db.players = players;
            res.json(db);
            }); 
        }); 
    // res.json(cities);
    }); 
};