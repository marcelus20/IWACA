/**
Felipe Mantovani 2017192
 */
const Vocation = require('../models/vocation.js'); // Main model utilised by this controller
const Player   = require('../models/player'); 


//declaring vocations that user cannot delete
/**
These are the default vocations of the system. User will be able to create their own, but cannot, delete the ones bellow, no matter what. 
User will be able to delete nd update just the ones they create, but not these
 */
const defaultVocations = ["knight", "paladin", "sorcerer","druid","elite knight","royal paladin", "master sorcerer", "elder druid"];

// Creates a new voction record in the db
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

//Get a list of existing vocations
exports.getVocations = (req, res) => {
  Vocation.find({}, function (err, vocations) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(vocations);
  }); 
};

/**
    Get a specific vocation by id passed in the params object
 */
exports.getVocation = (req, res) => {
  Vocation.findOne({_id: req.params.id}, function (err, vocation) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(vocation);
  }); 
};


//Update an existing vocation
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
//to prevent deleting a Vocation with an existing player, this callback will check first this association.
//It is not allowed to delete a vocation without having deleted the player associated the that vocation. 
exports.isAssociatedWithAPlayer = (req, res) => {
    //first, get the array of players
    Player.find({}, (err, players)=>{
        //now turn this array of players into an array of vocation id
        const ids = players.map(player=>player.vocation);
        // console.log({"ids": ids, });
        res.status(200).json({"association":ids.reduce((acc,current)=>req.params.vocationId == current || acc, false)});
    });
}

/**
Delete a vocation. Once again, default ones should not be delete. Frontend has mechanismos to prevent it from deleting, 
but if it is done by postman, it may delete, but frontend will break
 */
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