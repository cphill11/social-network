// import dependencies; Schema constructor & model fxn come straight from Mongoose
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionSchema = require("./Reaction");

// create schema w/ desired data after import functionality
const ThoughtSchema = new Schema(
  {
    // user who created the thought
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      // creates timestamp should user not enter a value
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    // validate data for rxn
    reactions: [reactionSchema],
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

// get total count of reactions on retrieval
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model("Thought", ThoughtSchema);

// export the Thought model
module.exports = Thought;
