/**Code retrieved from the professors (Mikhail) template. Not mine */

var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    created: Date
});

module.exports = mongoose.model('Image', imageSchema);