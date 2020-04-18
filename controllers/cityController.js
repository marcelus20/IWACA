const City = require('../models/city.js');

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