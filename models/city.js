//Felipe Mantovani 2017192
//Model to represent the City entity. 
const mongoose = require('mongoose');

//attributes: name
const citySchema = new mongoose.Schema({ 
    name: { type: String, unique: true},
});

module.exports = mongoose.model('City', citySchema);