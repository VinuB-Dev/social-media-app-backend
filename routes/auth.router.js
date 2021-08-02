const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const bcryptSalt = bcrypt.genSaltSync(8);

const User = require('../models/user.model');
const Connection = require('../models/connection.model');
const jwt = require("jsonwebtoken");
const secret = process.env['jwt-secret'];

router.post('/signup',async function(req, res) {
  try{
    const { email, password, name, tag } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
      const newUser = await User.create({ name: name,tag:tag, email: email, password: hashedPassword });
      const connections = await Connection.create({ _id: newUser._id });
      const token = await jwt.sign({uid: newUser._id}, secret, {expiresIn: '24h'})
      res.status(201).json({
        success: true,
        token: token
      });
    } else {
      res.status(409).json({
        success: false,
        error: {
          message: "User Already Exists"
        }
      });
    }
  }catch(e){
      res.status(400).json({
        success: false,
        error: {
          message: e.message
        }
      });
  }  
});

router.post('/login', async function(req, res){
  const {email, password} = req.body;
  try{
  const user = await User.findOne({ email: email });
  
  if(user){
    const validPassword = bcrypt.compareSync(password, user.password);
    const token = jwt.sign({uid: user._id}, secret, {expiresIn: '24h'})
    if(validPassword){
      res.status(200).json({
        success: true,
        token: token
      })
    }
    else{
      res.status(401).json({
        success: false,
        error: {
          message: "Invalid password"
        }
      });
    }    
  }else{
    res.status(401).json({
        success: false,
        error: {
          message: "User not registered"
        }
    })
  }}catch(e){
      res.status(400).json({
        success: false,
        error: {
          message: e.message
        }
      });
  }  
});

module.exports = router;