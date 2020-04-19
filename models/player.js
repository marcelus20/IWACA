
const mongoose = require('mongoose');


const playerSchema = new mongoose.Schema({ 
    name: { type: String, unique: true, lowercase: true},
    level: Number,
    vocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vocation'
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    sex: {
        type: String,
        enum: ['F', 'M']
    }
});

module.exports = mongoose.model('Player', playerSchema);