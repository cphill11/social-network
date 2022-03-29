// uses validation that Mongoose does automatically
const { Schema, model, Types } = require("mongoose");

// // import dateFormat fxn
// const dateFormat = require("../utils/dateFormat");

const UserSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment's _id field
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: {
      // array of _id values referencing the THOUGHT model
    },
    friends: {
      // array of _id values referencing the USER model (self-reference)
    }
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});
const User = model("User", UserSchema);

module.exports = User;
