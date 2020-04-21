const mongoose = require('mongoose');


const vocationSchema = new mongoose.Schema({ 
    name: { type: String, unique: true, lowercase: true},
    image : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
});

module.exports = mongoose.model('Vocation', vocationSchema);