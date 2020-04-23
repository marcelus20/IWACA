/**
 * Felipe Mantovani 2017192
 * 
 * Model to represent the Vocation entity
 */
const mongoose = require('mongoose');

/**
 * Attrs: name: Strin, image: Image
 */
const vocationSchema = new mongoose.Schema({ 
    name: { type: String, unique: true, lowercase: true},
    image : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
});

module.exports = mongoose.model('Vocation', vocationSchema);