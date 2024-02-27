const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require("bcrypt");
const router = require('./controller/registerController');
const room = require('./controller/roomController')
//const guest = require('./controller/guestController')
//const menu = require('./controller/menuController')
const app = express();
const port = 5000;


app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded( { extended : false} ) );
app.use(router);
app.use(room);


const connect = mongoose.connect("mongodb://localhost:27017/login")
 connect.then(() => {
  console.log("Database connected successfully");
  }).catch((err) => {
    console.error(err);
  });

// Serve static files from the "public" directory
app.use(express.static("public", { 
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.get( "/admin", (req, res) =>{
    res.render("admin");
});

app.get( "/login", (req, res) =>{
  res.render("login");
});

app.get( "/", (req, res) =>{
  res.render("home");
});

app.get( "/signup", (req, res) =>{
  res.render("signup");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

 
