const mongoose = require("mongoose");

const {Schema} = mongoose;

const UserSchema = new Schema({
  name: {type:String, required: true},
  tag:{type:String,required: true},
  email: {type:String, required: true},
  password: {type:String, required: true},
  about: {type: String, default:""},
  profileImg:{type: String, default:"https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png"}
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User;