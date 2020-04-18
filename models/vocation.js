const mongoose = require('mongoose');


const vocationSchema = new mongoose.Schema({ 
    name: { type: String, unique: true, lowercase: true},
});

module.exports = mongoose.model('Vocation', vocationSchema);