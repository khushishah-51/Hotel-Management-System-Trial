const express = require("express");
const path = require('path');
const bcrypt = require("bcrypt");
const router = require('./controller/registerController');

const app = express();
const port = 5000;
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded( { extended : false} ) );
app.use(router);

//static file
app.use(express.static("public"));

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

 
