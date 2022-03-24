// import dependencies; Schema constructor & model fxn come straight from Mongoose
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// create schema w/ desired data after import functionality
const SocialSchema = new Schema(
  {
    socialName: {
      type: String,
      // required set to true requires data to exist for this field
      required: true,
      // trim set to true will remove white space before & after input string (useful for username/ pwd strings)
      trim: true,
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
    // size: {
    //   type: String,
    //   required: true,
        // enum = enumerable (data can be iterated repeatedly, such as for..in loops; provide an array the the size field will accept)
    //   enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
    //   default: 'Large'
    // },
    // toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  // tell schema that it can use virtuals; id is set to false as it is a virtual that Mongoose returns (don't need)
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of comments and replies on retrieval
SocialSchema.virtual("commentCount").get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

// create the Social model using the SocialSchema
const Social = model("Social", SocialSchema);

// export the Social model
module.exports = Social;
