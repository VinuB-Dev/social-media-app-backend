const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/updateUserInfo', async (req, res) => {
  const {tag,about,profileImg} = req.body;
  try {
    if(profileImg){
        const uploadResponse = await cloudinary.uploader.upload(profileImg, {
            upload_preset: 'e2ackzwv',
            
        });
        const user = await User.findByIdAndUpdate(req.uid,{$set: {'about': about,'tag':tag,'profileImg':uploadResponse.url}})
        }
        const user = await User.findByIdAndUpdate(req.uid,{$set: {'about': about,'tag':tag}})
        res.json({success:true,user});
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
})

module.exports = router;
