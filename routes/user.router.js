const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post('/updateUserInfo', async (req, res) => {
  const {tag,about} = req.body;
const user = await User.findByIdAndUpdate(req.uid,{$set: {'about': about,'tag':tag}})
})