/**
 * Model to represent the player entity - Felipe Mantovani 2017192
 */
const mongoose = require('mongoose');

/**
 * Attrs: name: Strubg, level:Number , vocation: Vocation, city: City, sex: enum
 */
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