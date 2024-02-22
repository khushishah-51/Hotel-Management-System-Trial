const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017")
 connect.then(() => {
  console.log("Database connected successfully");
  }).catch((err) => {
    console.error(err);
  });
    
//Schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true    
    },
    password: {
        type: String,
        reequired: true
    }
});

//Collection
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;