const mongoose = require('mongoose');


const registerSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
});


const modelName = "Accounts";
module.exports = mongoose.models[modelName] || mongoose.model(modelName, registerSchema);
