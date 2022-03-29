const { Schema, Types } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },

  reactionBody: {
    type: String,
    required: true,
    // max 280 characters
  },

  username: {
      type: String,
      required: true,
  },
  createdAt: {
    type: Date,
    // creates timestamp should user not enter a value
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
});

module.exports = reactionSchema;
