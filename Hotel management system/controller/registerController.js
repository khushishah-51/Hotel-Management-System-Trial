const express = require("express");
const bcrypt = require('bcrypt');
const collection = require("../model/register");
const router = express.Router();

// Add a function to validate username
function validateUsername(username) {
  // Username should be at least 5 characters long
  return typeof username === 'string' && username.trim().length >= 5;
}

// Add a function to validate password
function validatePassword(password) {
  // Password should be at least 5 characters long
  return typeof password === 'string' && password.trim().length >= 5;
}

 
exports.signupForm  = async (req,res) => {
     
    const data = {
     name: req.body.username,
     password: req.body.password
    }
    // Validate username and password
    if (!validateUsername(data.name) || !validatePassword(data.password)) {
        return res.status(400).send("Invalid username or password. Username should not be empty and password should be at least 5 characters long.");
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
};


exports.loginForm = async (req,res) => {
   try{
       const { username, password } = req.body;

       if (!username || !password) {
         return res.send("Please enter both username and password!");
       }
       // Validate username and password
       if (!validateUsername(username) || !validatePassword(password)) {
            return res.status(400).send("Invalid username or password. Username should not be empty and password should be at least 5 characters long.");
       }
       const user = await collection.findOne({ name: username }); 
       if(!user){
         res.send ("username dosn't exist.check username or Signup");
       }

       //compare the hash password from the database with plaintext
       const isPasswordMatch= await bcrypt.compare(password ,user.password);
       if(isPasswordMatch) {
         res.render("user")
       }else{
         res.send("wrong password!");
       }
     } catch (error) {
       console.error(error);
       res.send("Something went wrong!");
     }        
};


exports.adminForm = async (req,res) => {
 try{
     const { username, password } = req.body;

     if (!username || !password) {
       return res.send("Please enter both username and password!");
     }
        // Validate username and password
     if (!validateUsername(username) || !validatePassword(password)) {
       return res.status(400).send("Invalid username or password. Username should not be empty and password should be at least 5 characters long.");
     }
     const user = await collection.findOne({ name: username, isAdmin: true });

     if (!user) {
       res.send("Wrong details. Check details!");
     } else {
       const isPasswordMatch = await bcrypt.compare(password, user.password);
       if (isPasswordMatch) {
        // Set session variables upon successful login
        req.session.username = username;
        req.session.isAdmin = user.isAdmin || false;        
         res.render("admincontrol");
       } else {
         res.send("Wrong details. Check details!");
       }
     }
   } catch (error) {
     console.error(error);
     res.send("Something went wrong!");
   }        
};

//module.exports = router;
