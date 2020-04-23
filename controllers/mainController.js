/**
 * Felipe Mantovani: 2017192
 * 
 * Models utilized by this controller: Player, City and Vocation
 */

const Player = require('../models/player.js');
const City = require('../models/city.js');
const Vocation = require('../models/vocation.js');



/**
 * Selects everything in the database (players, cities and vocations), except images and returns in a single object. 
 */
exports.selectEverything = (req, res) => {
    const db = {};  
    City.find({}, function (err, cities) {// selects all cities
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

/**
 * The Not found routing
 */
exports.notFound = (req, res) => {
    res.status(404).json({"message":"not found"});
};