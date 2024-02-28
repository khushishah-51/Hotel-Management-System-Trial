const mongoose = require('mongoose');
//schema
const menuSchema = new mongoose.Schema({
  menuName: { type: String, required: true, unique: true },
  menuDescription: { type: String, required: true },
  price: { type: Number, required: true },
});

const Menu = mongoose.model('Menu', menuSchema);
 module.exports = Menu;