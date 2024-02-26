const mongoose = require('mongoose');
    
//Schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true    
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
});

//Collection
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;