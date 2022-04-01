// uses validation that Mongoose does automatically
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

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
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      // creates timestamp should user not enter a value
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
    friends: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("thoughtCount").get(function () {
  return this.thought.reduce(
    (total, thoughts) => total + thought.replies.length + 1,
    0
    );
  });
const User = model("User", UserSchema);

module.exports = User;
