const mongoose = require("mongoose");

const {Schema} = mongoose;

const TweetSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  content: {type:String, required: true},
  image:{type:String},
  likes:{type:Number, default: 0}
}, {timestamps: true});

const Tweet = mongoose.model("Tweet", TweetSchema);

module.exports = Tweet;