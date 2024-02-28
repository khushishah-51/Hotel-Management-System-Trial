const express = require('express');
const router = express.Router();
const Menu = require('../model/menu');
const methodOverride = require('method-override');

// method override middleware
router.use(methodOverride('_method'));

// Add menu form rendering
exports.addMenuForm = (req, res) => {
  res.render('Menu/addMenu'); //view file named addMenu.ejs inside the Menu directory
};

// Add menu
exports.addMenu = async (req, res) => {
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
};

// Update menu form rendering 
exports.updateMenuForm = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res.render('Menu/updateMenu', { menu }); //view file named updateMenu.ejs inside the Menu directory
  } catch (err) {
    console.error(err);
    res.status(404).send('Menu not found');
  }
};

// Update menu 
exports.updateMenu = async (req, res) => {
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
};


// Menu with search
exports.listMenu = async (req, res) => {
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
};


// Delete menu form rendering
exports.deleteMenuForm =async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res.render('Menu/deleteMenu', { menu }); //view file named deleteMenu.ejs inside the Menu directory
  } catch (err) {
    console.error(err);
    res.status(404).send('Menu not found');
  }
};

// Delete menu 
exports.deleteMenu = async (req, res) => {
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
};

//module.exports = router;


