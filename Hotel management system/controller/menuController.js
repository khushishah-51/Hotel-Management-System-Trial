const express = require('express');
const router = express.Router();
const Menu = require('../model/menu');
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
// Add menu form rendering
router.get('/admin/menu/add', isAdmin, (req, res) => {
  res.render('Menu/addMenu'); //view file named addMenu.ejs inside the Menu directory
});

// Add menu
router.post('/admin/menu/add', isAdmin, async (req, res) => {
  const newMenu = new Menu({
    menuName: req.body.menuName,
    menuDescription: req.body.menuDescription,
    price: req.body.price
  });
  try {
    const savedMenu = await newMenu.save();
    res.redirect('/admin/menu'); // Redirect to the list of rooms after adding
  } catch (err) {
    res.status(400).send('Unable to add this menu');
  }
});

// Update menu form rendering
router.get('/admin/menu/update/:id', isAdmin, async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res.render('Menu/updateMenu', { menu }); //view file named updateMenu.ejs inside the Menu directory
  } catch (err) {
    console.error(err);
    res.status(404).send('Menu not found');
  }
});

// Update menu
router.put('/admin/menu/update/:id', isAdmin, async (req, res) => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedMenu) {
      res.redirect('/admin/menu'); // Redirect to the Menu after updating
    } else {
      res.status(404).send('Menu not found');
    }
  } catch (err) {
    console.error(err);
    res.status(400).send('Unable to update this menu');
  }
});


// Menu with search
router.get('/admin/menu', isAdmin, async (req, res) => {
  try {
    let query = {};
    if (req.query.menuName) {
      query = { menuName: req.query.menuName };
    }
    const menus = await Menu.find(query);
    res.render('Menu/listMenus', { menus, searchQuery: req.query.menuName }); // Pass search query to the view
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


// Delete menu form rendering
router.get('/admin/menu/delete/:id', isAdmin, async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res.render('Menu/deleteMenu', { menu }); //view file named deleteMenu.ejs inside the Menu directory
  } catch (err) {
    console.error(err);
    res.status(404).send('Menu not found');
  }
});

// Delete menu
router.delete('/admin/menu/delete/:id', isAdmin, async (req, res) => {
  try {
    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
    if (deletedMenu) {
      res.redirect('/admin/menu'); // Redirect to the Menu after deletion
    } else {
      res.status(404).send('Menu not found');
    }
  } catch (err) {
    console.error(err);
    res.status(400).send('Unable to delete this dish');
  }
});

module.exports = router;


