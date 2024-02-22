const express = require("express");
const path = require('path');
const bcrypt = require("bcrypt");
const collection = require("./src/config");

const app = express();
const port = 5000;
app.set('view engine', 'ejs');

app.use(express.urlencoded( { extended : false} ) );
app.use(express.json());

//static file
app.use(express.static("public"));
app.get( "/", (req, res) =>{
    res.render("login");
});

app.get( "/signup", (req, res) =>{
  res.render("signup");
});

app.post("/signup", async (req,res) => {
     
     const data = {
      name: req.body.username,
      password: req.body.password
     }

     const userdata = await collection.insertMany(data);
     console.log(userdata);
});

  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
