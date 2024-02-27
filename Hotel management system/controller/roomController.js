const express = require('express');
const router = express.Router();
const Room = require('../model/room');

// Add room form rendering
router.get('/admin/room/add', (req, res) => {
  res.render('Room/addRoom'); // Assuming you have a view file named addRoom.ejs inside the Room directory
});

// Add room
router.post('/admin/room/add', async (req, res) => {
  const newRoom = new Room({
    roomNumber: req.body.roomNumber,
    roomType: req.body.roomType,
    price: req.body.price
  });
  try {
    const savedRoom = await newRoom.save();
    //res.redirect('/admin/room'); // Redirect to the list of rooms after adding
  } catch (err) {
    res.status(400).send('Unable to add this room');
  }
});

// Update room form rendering
router.get('/admin/room/update/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.render('Room/updateRoom', { room }); // Assuming you have a view file named updateRoom.ejs inside the Room directory
  } catch (err) {
    console.error(err);
    res.status(404).send('Room not found');
  }
});

// Update room
router.put('/admin/room/update/:id', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedRoom) {
      res.redirect('/admin/room'); // Redirect to the list of rooms after updating
    } else {
      res.status(404).send('Room not found');
    }
  } catch (err) {
    console.error(err);
    res.status(400).send('Unable to update this room');
  }
});

// List rooms
router.get('/admin/room', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.render('Room/listRooms', { rooms }); // Assuming you have a view file named listRooms.ejs inside the Room directory
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete room
router.delete('/admin/room/delete/:id', async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (deletedRoom) {
      res.redirect('/admin/room'); // Redirect to the list of rooms after deletion
    } else {
      res.status(404).send('Room not found');
    }
  } catch (err) {
    console.error(err);
    res.status(400).send('Unable to delete this room');
  }
});

// Search room by room number form rendering
router.get('/admin/room/search', (req, res) => {
  res.render('Room/searchRoom'); // Assuming you have a view file named searchRoom.ejs inside the Room directory
});

// Search room by room number
router.get('/admin/room/search/:roomNumber', async (req, res) => {
  try {
    const room = await Room.findOne({ roomNumber: req.params.roomNumber });
    if (room) {
      res.render('Room/showRoom', { room }); // Assuming you have a view file named showRoom.ejs inside the Room directory
    } else {
      res.status(404).send('Room not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

