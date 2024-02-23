const express = require("express");
const path = require('path');
const bcrypt = require("bcrypt");
const collection = require("./src/config");

const app = express();
const port = 5000;
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded( { extended : false} ) );

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

     const existingUser = await collection.findOne({name: data.name}); 
     if(existingUser){
        res.send ("user already exist! please choose a different username");
     }else {
        //hash the password uding bcrypt
        const  saltRounds = 10;
        let hashedPassword= await bcrypt.hash(data.password ,saltRounds);
        data.password = hashedPassword; //Replace the hashed password with oiginal password
        const userdata = await collection.insertMany(data);
        console.log(userdata);
     } 
});

app.post("/login", async (req,res) => {
    try{
        const { username, password } = req.body;

        if (!username || !password) {
          return res.send("Please enter both username and password!");
        }
        
        const user = await collection.findOne({ name: username }); 
        if(!user){
          res.send ("username dosn't exist.check username or Signup");
        }

        //compare the hash password from the database with plaintext
        const isPasswordMatch= await bcrypt.compare(password ,user.password);
        if(isPasswordMatch) {
          res.render("home")
        }else{
          res.send("wrong password!");
        }
      } catch (error) {
        console.error(error);
        res.send("Something went wrong!");
      }        
});

  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
