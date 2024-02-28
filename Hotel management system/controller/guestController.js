const express = require('express');
const router = express.Router();
const Guest = require('../model/guest');
const methodOverride = require('method-override');

// method override middleware
router.use(methodOverride('_method'));

const isAdmin = (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    // If session has isAdmin set to true, proceed to next middleware/route handler
    next();
  } else {
    // If not authenticated, redirect or send an error response
    res.status(403).send('Unauthorized');
  }
};
// Add guest form rendering
router.get('/admin/guest/add', isAdmin, (req, res) => {
  res.render('Guest/addGuest'); //view file named addGuest.ejs inside the Guest directory
});

// Add guest
router.post('/admin/guest/add', isAdmin, async (req, res) => {
  const newGuest = new Guest({
    roomNumber: req.body.roomNumber,
    guestName: req.body.guestName,
    price: req.body.price
  });
  try {
    const savedGuest = await newGuest.save();
    res.redirect('/admin/guest'); // Redirect to the list of guests after adding
  } catch (err) {
    res.status(400).send('Unable to add this guest');
  }
});

// Update guest form rendering
router.get('/admin/guest/update/:id', isAdmin, async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    res.render('Guest/updateGuest', { guest }); //view file named updateGuest.ejs inside the Guest directory
  } catch (err) {
    console.error(err);
    res.status(404).send('Guest not found');
  }
});

// Update guest
router.put('/admin/guest/update/:id', isAdmin, async (req, res) => {
  try {
    const updatedGuest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedGuest) {
      res.redirect('/admin/guest'); // Redirect to the Guest after updating
    } else {
      res.status(404).send('Guest not found');
    }
  } catch (err) {
    console.error(err);
    res.status(400).send('Unable to update this guest');
  }
});


// List of Guest with search
router.get('/admin/guest', isAdmin, async (req, res) => {
  try {
    let query = {};
    if (req.query.guestName) {
      query = { guestName: req.query.guestName };
    }
    const guests = await Guest.find(query);
    res.render('Guest/listGuests', { guests, searchQuery: req.query.guestName }); // Pass search query to the view
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


// Delete guest form rendering
router.get('/admin/guest/delete/:id', isAdmin, async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    res.render('Guest/deleteGuest', { guest }); //view file named deleteGuest.ejs inside the Guest directory
  } catch (err) {
    console.error(err);
    res.status(404).send('Guest not found');
  }
});

// Delete guest
router.delete('/admin/guest/delete/:id', isAdmin, async (req, res) => {
  try {
    const deletedGuest = await Guest.findByIdAndDelete(req.params.id);
    if (deletedGuest) {
      res.redirect('/admin/guest'); // Redirect to the List of Guests after deletion
    } else {
      res.status(404).send('Guest not found');
    }
  } catch (err) {
    console.error(err);
    res.status(400).send('Unable to delete this guest');
  }
});

module.exports = router;