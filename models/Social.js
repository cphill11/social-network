// import dependencies; Schema constructor & model fxn come straight from Mongoose
const { Schema, model } = require('mongoose');

// create schema w/ desired data after import functionality
const SocialSchema = new Schema({
    socialName: {
      type: String
    },
    // createdBy: {
    //   type: String
    // },
    // createdAt: {
    //   type: Date,
    //   default: Date.now
    // },
    // size: {
    //   type: String,
    //   default: 'Large'
    // },
    // toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
    // tell schema that it can use virtuals; id is set to false as it is a virtual that Mongoose returns (don't need)
  {
    toJSON: {
      virtuals: true,
    },
    id: false
});

// create the Social model using the SocialSchema
const Social= model('Social', SocialSchema);

// export the Social model
module.exports = Social;