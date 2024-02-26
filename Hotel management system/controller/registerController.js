const express = require("express");
const bcrypt = require('bcrypt');
const collection = require("../model/register");
const router = express.Router();


router.post("/signup", async (req,res) => {
     
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

router.post("/", async (req,res) => {
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

router.post("/admin", async (req,res) => {
 try{
     const { username, password } = req.body;

     if (!username || !password) {
       return res.send("Please enter both username and password!");
     }

     const user = await collection.findOne({ name: username, isAdmin: true });

     if (!user) {
       res.send("Wrong details. Check details!");
     } else {
       const isPasswordMatch = await bcrypt.compare(password, user.password);
       if (isPasswordMatch) {
         res.render("admincontrol");
       } else {
         res.send("Wrong details. Check details!");
       }
     }
   } catch (error) {
     console.error(error);
     res.send("Something went wrong!");
   }        
});

module.exports = router;

