const mongoose = require('mongoose');
//schema
const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true, unique: true },
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
});

const Room = mongoose.model('Room', roomSchema);
 module.exports = Room;
