const { Thought } = require("../models");

const thoughtController = {
// GET to get all thoughts

// GET to get a single thought by its _id

// POST to create a new thought (push the created thought's _id to the associated user's thoughts array field)
    // example data

    // {
    //   "thoughtText": "Here's a cool thought...",
    //   "username": "lernantino",
    //   "userId": "5edff358a0fcb779aa7b118b"
    // }


// PUT to update a thought by its _id

// DELTE to remove a thought by its _id



// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value 

  // get all thought data
  getAllSocial(req, res) {
    Social.find({})
      .populate({
        path: "comments",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbSocialData) => res.json(dbSocialData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one component social data by id
  getSocialById({ params }, res) {
    Social.findOne({ _id: params.id })
      .populate({
        path: "comments",
        select: "-__v",
      })
      .select("-__v")
      .then((dbSocialData) => {
        // If no social data is found, send 404
        if (!dbSocialData) {
          res
            .status(404)
            .json({ message: "No social data found with this id!" });
          return;
        }
        res.json(dbSocialData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // createSocial
  createSocial({ body }, res) {
    Social.create(body)
      .then((dbPizzaData) => res.json(dbSocialData))
      .catch((err) => res.json(err));
  },

  // update social data by id; runValidators included to validate all new info
  updateSocial({ params, body }, res) {
    Social.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then((dbSocialData) => {
        if (!dbSocialData) {
          res
            .status(404)
            .json({ message: "No social data found with this id!" });
          return;
        }
        res.json(dbSocialData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete social data
  deleteSocial({ params }, res) {
    Social.findOneAndDelete({ _id: params.id })
      .then((dbSocialData) => {
        if (!dbSocialData) {
          res
            .status(404)
            .json({ message: "No social data found with this id!" });
          return;
        }
        res.json(dbSocialData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = socialController;
