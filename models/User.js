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

  //   replyId: {
  //     type: Schema.Types.ObjectId,
  //     default: () => new Types.ObjectId(),
  //   },
  //   replyBody: {
  //     type: String,
  //     required: true,
  //     trim: true
  //   },
  //   writtenBy: {
  //     type: String,
  //     required: true
  //   },
  //   createdAt: {
  //     type: Date,
  //     default: Date.now,
  //     get: (createdAtVal) => dateFormat(createdAtVal),
  //   },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// const CommentSchema = new Schema(
//   {
//     writtenBy: {
//       type: String,
//       required: true
//     },
//     commentBody: {
//       type: String,
//       required: true
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: (createdAtVal) => dateFormat(createdAtVal),
//     },
//     // use ReplySchema to validate data for a reply; nested in comment's documents & not referred to
//     replies: [ReplySchema],
  // },
  // {
  //   toJSON: {
  //     virtuals: true,
  //     getters: true,
  //   },
  //   id: false,
  // }
// );

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});
const User = model("User", UserSchema);

module.exports = User;
