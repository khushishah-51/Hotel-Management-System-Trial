const Room = require('../models/room');

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.render('rooms', { rooms });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).send('Room Not Found');
    res.render('room', { room });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

exports.createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.redirect('/room');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.render('room', { room });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.redirect('/room');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};