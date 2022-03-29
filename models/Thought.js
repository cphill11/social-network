// import dependencies; Schema constructor & model fxn come straight from Mongoose
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// create schema w/ desired data after import functionality
const ThoughtSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    thoughtText: {
      type: String,
      required: true,
      // must be between 1 and 280 characters        
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
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
        // is this correct (??)
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
ThoughtSchema.virtual("thoughtCount").get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

// create the Social model using the SocialSchema
const Thought = model("Thought", ThoughtSchema);

// export the Social model
module.exports = Thought;
