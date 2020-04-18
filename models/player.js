
const mongoose = require('mongoose');


const playerSchema = new mongoose.Schema({ 
    name: { type: String, unique: true, lowercase: true},
    level: Number,
    vocation: {
        type: String,
        enum: ["knight","paladin","sorcerer","druid","elite knight","royal paladin","master sorcerer","elder druid"]
    },
    city: {
      "type": "string",
      "enum": ["Ankrahmun","Darashia","Carlin","Ab'Dendriel","Thais","Edron","Kazordoon","Venore","Yalahar","Port Hope","Liberty Bay"]
    },
    sex: {
        type: String,
        enum: ['F', 'M']
    }
});

module.exports = mongoose.model('Player', playerSchema);