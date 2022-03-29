// import dependencies; Schema constructor & model fxn come straight from Mongoose
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionSchema = require('./Reaction');

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

// need a virtual called reactionCount that retrieves length of thought's reactions array field on query
// (????????)
// get total count of reactions on retrieval
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.reduce(
    (total, reaction) => total + comment.replies.length + 1,
    0
  );
});

// create the Thought model using the ThoughtSchema
const Thought = model("Thought", ThoughtSchema, reactionSchema);

// export the Thought model
module.exports = Thought;
