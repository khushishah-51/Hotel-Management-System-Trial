const express = require('express');
const router = express.Router();
const Room = require('../model/room');
const methodOverride = require('method-override');

// method override middleware
router.use(methodOverride('_method'));

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
    console.log(req.params.id)
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


// List rooms with search
router.get('/admin/room', async (req, res) => {
  try {
    let query = {};
    if (req.query.roomNumber) {
      query = { roomNumber: req.query.roomNumber };
    }
    const rooms = await Room.find(query);
    res.render('Room/listRooms', { rooms, searchQuery: req.query.roomNumber }); // Pass search query to the view
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


// Delete room form rendering
router.get('/admin/room/delete/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.render('Room/deleteRoom', { room }); // Assuming you have a view file named deleteRoom.ejs inside the Room directory
  } catch (err) {
    console.error(err);
    res.status(404).send('Room not found');
  }
});

// Delete room
router.delete('/admin/room/delete/:id', async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    console.log(req.params.id)
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

module.exports = router;

