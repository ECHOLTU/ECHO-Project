const mongoose = require('mongoose');


const cookieSchema = new mongoose.Schema({
    cookie: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    admin : { type: Boolean, required: true },
    lastName: { type: String, required: true },
});


const modelName = 'Cookie';
module.exports = mongoose.models[modelName] || mongoose.model(modelName, cookieSchema);