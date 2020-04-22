const Vocation = require('../models/vocation.js');


//declaring vocations that user cannot delete
const defaultVocations = ["knight", "paladin", "sorcerer","druid","elite knight","royal paladin", "master sorcerer", "elder druid"];


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

//This function checks if the vocation id passed as parameter is a default one. 
//The returning object should contain the key "default vocation" and its value is boolean
exports.checkIfVocationIsDefault = (req, res) => {
    //first, get the complete list of vocations in the db
    Vocation.find({}, function (err, vocations) {
        if (err) {
            res.status(400).json(err); 
        } 
        //now filter the array of vocations only with names contained in the default vocations and turn it into an array of ids.
        const ids = vocations.filter(vocation => defaultVocations.includes(vocation.name)).map(vocation=>vocation._id);
        //if the ids conatains the id passed as parameter
        res.status(200).json({"defaultVocation" : ids.reduce((acc,current)=>req.params.vocationId == current || acc, false)});
    });
}
//this routing does a simple thing. Returns the default images for vocation.
//This image is going to be associated with the vocations user creates
exports.defaultVocationRelated = (req, res) => {
    res.status(200).json({default: "5e9f58593ce82b082803dff4"});
}

exports.deleteVocation = (req, res) => {
    //first, get the list of vocations in the DB:
    Vocation.find({}, function (err, vocations) {
        if (err) {
            res.status(400).json(err); 
        } 
        //now filter the array of vocations only with names contained in the default vocations and turn it into an array of ids.
        const ids = vocations.filter(vocation => defaultVocations.includes(vocation.name)).map(vocation=>vocation._id);
        //if the ids conatains the id passed as parameter
        if(ids.reduce((acc,current)=>req.params.id == current || acc, false)){
            //don't delete it.
            res.status(403).json({"defaultVocation":"Not allowed to delete a default location"});
        }else{
            //good to delete
            Vocation.findByIdAndRemove(req.params.id, function (err, vocation) {
                if (err) {
                    res.status(400).json(err);
                } 
                res.json(vocation);
            }); 
        }
        
    }); 
    


    
};