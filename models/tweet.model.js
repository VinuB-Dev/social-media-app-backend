const mongoose = require("mongoose");

const {Schema} = mongoose;

const CommentSchema = new Schema ({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  comment: {type:String, required: true}
})

const TweetSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  content: {type:String, required: true},
  image:{type:String},
  likedBy:[{type:Schema.Types.ObjectId}],
  comments :{type:[CommentSchema]}
  }, {timestamps: true})

const Tweet = mongoose.model("Tweet", TweetSchema);

module.exports = Tweet;