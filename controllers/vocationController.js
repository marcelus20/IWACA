const Vocation = require('../models/vocation.js');

exports.createVocation = (req, res) => { 
    console.log(req.body);
    var newVocation = new Vocation(req.body);
    newVocation.save(function (err, vocation) { 
        if (err) { 
            res.status(400).json(err);
        }

        res.json(vocation); 
});
};

exports.getVocations = (req, res) => {
  Vocation.find({}, function (err, vocations) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(vocations);
  }); 
};

exports.getVocation = (req, res) => {
  Vocation.findOne({_id: req.params.id}, function (err, vocation) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(vocation);
  }); 
};

exports.updateVocation = (req, res) => {
  Vocation.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},function (err, vocation) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(vocation);
  }); 
};

exports.deleteVocation = (req, res) => {
  Vocation.findByIdAndRemove(req.params.id, function (err, vocation) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(vocation);
  }); 
};