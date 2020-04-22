const City = require('../models/city.js');
const Player = require('../models/player.js');

exports.createCity = (req, res) => { 
    console.log(req.body);
    var newCity = new City(req.body);
    newCity.save(function (err, city) { 
        if (err) { 
            res.status(400).json(err);
        }

        res.json(city); 
});
};

exports.getCities = (req, res) => {
  City.find({}, function (err, cities) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(cities);
  }); 
};

exports.getCity = (req, res) => {
  City.findOne({_id: req.params.id}, function (err, city) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(city);
  }); 
};

exports.updateCity = (req, res) => {
  City.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},function (err, city) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(city);
  }); 
};

exports.deleteCity = (req, res) => {
  City.findByIdAndRemove(req.params.id, function (err, city) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(city);
  }); 
};

//check if city is being used by a player
exports.cityIsAssociatedWithAPlayer = (req, res) => {
    //get the list of player in db
    Player.find({}, (err, players)=>{
        if (err) {
            res.status(400).json(err);
        } 
        //convert the array of player into an array of cities id
        const ids = players.map(player=>player.city);
        //check if id passed as params is in the array
        console.log({"id":req.params.cityId, "ids": ids});
        res.status(200).json({"association":ids.reduce((acc,current)=>req.params.cityId == current || acc, false)});
    });
}