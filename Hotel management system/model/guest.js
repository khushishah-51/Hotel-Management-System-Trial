const mongoose = require('mongoose');
//schema
const guestSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true, unique: true },
  guestName: { type: String, required: true },
//   checkInDate: { type: Date, required: true, default: Date.now },
//   checkOutDate: { type: Date, required: true,} 
}); 
const Guest = mongoose.model('Guest', guestSchema);
 module.exports = Guest;