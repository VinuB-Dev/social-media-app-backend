const mongoose = require("mongoose");

const {Schema} = mongoose;

const ConnectionSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, required: true},
  followers:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {timestamps: true});

const Connection = mongoose.model("Connection", ConnectionSchema);

module.exports = Connection;