const express = require("express");
const router = express.Router();
const Connection = require("../models/connection.model");
const User = require('../models/user.model');

router.get('/', async (req, res) => {
  const followers = await Connection.findById(req.uid, 'followers').populate('followers','-password');
  const following = await Connection.findById(req.uid, 'following').populate('following','-password');
  res.json({
    success: true,
    followers,
    following
  });
})

router.get("/users", async (req, res) => {
  try{
    const users = await User.find({},'_id name tag profileImg')
    res.status(200).json({
      success: true,
      users
    });
  }catch(e){
    res.status(500).json({
      success: false,
      error: {
        message: e.message
      }
    })
  } 
});



router.post("/follow", async (req, res) => {
  try{
    const {userId} = req.body;
    const user = await Connection.findByIdAndUpdate(req.uid, {$push: {following: userId}});
    const follower = await Connection.findByIdAndUpdate(userId, {$push: {followers: req.uid}});
    res.status(200).json({
      success: true
    });
  }catch(e){
    res.status(500).json({
      success: false,
      error: {
        message: e.message
      }
    })
  } 
});

router.post("/unfollow", async (req, res) => {
  try{
    const {userId} = req.body;
    const user = await Connection.findByIdAndUpdate(req.uid, {$pull: {following: userId}});
    const follower = await Connection.findByIdAndUpdate(userId, {$pull: {followers: req.uid}});
    res.status(200).json({
      success: true
    });
  }catch(e){
    res.status(500).json({
      success: false,
      error: {
        message: e.message
      }
    })
  } 
});

module.exports = router;
