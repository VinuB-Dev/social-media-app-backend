const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Connection = require("../models/connection.model");
const Tweet = require("../models/tweet.model")

router.get('/', async (req, res) => {
  const followingIds = await Connection.find({_id: req.uid}, 'following');
  let sort = {createdAt: -1};
  let tweets = await Tweet.find({user:req.uid}).populate('user','-password').populate('comments.user','-password').sort(sort);
  const all_tweets = await Tweet.find({}).populate('user','-password').populate('comments.user','-password').sort(sort);
  if(followingIds.length>0)
  {
  followingIds[0].following.map((ids)=>{
    all_tweets.map((tweet)=>{
      if(tweet.user._id.equals(ids))
        {
          tweets.push(tweet)
        }
    })
  })
  }
  const user = await User.findById(req.uid,'profileImg name tag about');
  
  res.status(200).json({
    success: true,
    tweets,
    user
  });
})

router.get('/getTweets', async (req, res) => {
  const { userId } = req.body;
  const tweets = await Tweet.find({_id: userId}).populate('user','-password');
  res.json({
    success: true,
    tweets
  });
})

router.post('/postTweet', async (req, res) => {
  try{
  const { content } = req.body;
const tweet = await Tweet.create({ content: content, user: req.uid});
const populatedPost = await tweet.populate('user').execPopulate()
  res.status(200).json({
    success: true
  });}
  catch(e){
    res.status(400).json({
        success: false,
        error: {
          message: e.message
        }
      });
  }
})

router.get('/current', async (req, res) => {
  try{
  let tweets = await Tweet.find({user:req.uid}).populate('user').sort({createdAt: -1});
  const user = await User.findById(req.uid,'profileImg name tag about');
  const followers = await Connection.findById(req.uid, 'followers').populate('followers');
  const following = await Connection.findById(req.uid, 'following').populate('following');
  res.status(200).json({
    success: true,
    tweets,
    user,
    followers,
    following
  });}
  catch(e){
    res.status(400).json({
        success: false,
        error: {
          message: e.message
        }
      });
  }
})

router.get('/:userId', async (req, res) => {
  try{
  const {userId} = req.params;
  let tweets = await Tweet.find({user:userId}).populate('user').sort({createdAt: -1});
  const user = await User.findById(userId,'profileImg name tag about');
  const followers = await Connection.findById(userId, 'followers').populate('followers');
  const following = await Connection.findById(userId, 'following').populate('following');
  res.status(200).json({
    success: true,
    tweets,
    user,
    followers,
    following
  });}
  catch(e){
    res.status(400).json({
        success: false,
        error: {
          message: e.message
        }
      });
  }
})

router.post('/addlike', async (req, res) => {
  try{
  const {tweetId} = req.body;
  const user = await Tweet.findByIdAndUpdate(tweetId, {$push: {likedBy: req.uid}});
  res.status(200).json({
    success: true
  });
  }
  catch(e){
    res.status(400).json({
        success: false,
        error: {
          message: e.message
        }
      });
  }
})

router.post('/removelike', async (req, res) => {
  try{
  const {tweetId} = req.body;
  const user = await Tweet.findByIdAndUpdate(tweetId, {$pull: {likedBy: req.uid}});
  res.status(200).json({
    success: true
  });}
  catch(e){
    res.status(400).json({
        success: false,
        error: {
          message: e.message
        }
      });
  }
})

router.post('/addComment', async (req, res) => {
  try{
  const {tweetId,comment} = req.body;
  const user = await Tweet.findByIdAndUpdate(tweetId, {$push: {comments: {user:req.uid,comment:comment}}});
  res.status(200).json({
    success: true
  });}
  catch(e){
    res.status(400).json({
        success: false,
        error: {
          message: e.message
        }
      });
  }
})

module.exports = router;
