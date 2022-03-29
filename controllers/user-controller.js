// import the models we need
const { User, Thought } = require("../models");

// create userController object
const userController = {
  // GET all users
  getAllUser(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // GET a single user by _id & populated thought & friend data
  // is this right (??)
  getUserById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbUserData) => {
        // If no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // POST a new user
  // example:
  // {
  //   "username": "lernantino",
  //   "email": "lernantino@gmail.com"
  // }
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // PUT to update a user by its _id; runValidators included to validate all new info
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User data found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE to remove a user by its _id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User data found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list

// // add comment to social data
// addComment({ params, body }, res) {
//   console.log(body);
//   Comment.create(body)
//     .then(({ _id }) => {
//       return Social.findOneAndUpdate(
//         { _id: params.socialId },
//         { $push: { comments: _id } },
//         { new: true }
//       );
//     })
//     .then((dbSocialData) => {
//       if (!dbSocialData) {
//         res
//           .status(404)
//           .json({ message: "No social data found with this id!" });
//         return;
//       }
//       res.json(dbSocialData);
//     })
//     .catch((err) => res.json(err));
// },
// // add reply
// addReply({ params, body }, res) {
//   Comment.findOneAndUpdate(
//     { _id: params.commentId },
//     { $push: { replies: body } },
//     { new: true, runValidators: true }
//   )
//     .then((dbSocialData) => {
//       if (!dbSocialData) {
//         res
//           .status(404)
//           .json({ message: "No social data found with this id!" });
//         return;
//       }
//       res.json(dbSocialData);
//     })
//     .catch((err) => res.json(err));
// },

// // remove reply
// removeReply({ params }, res) {
//   Comment.findOneAndUpdate(
//     { _id: params.commentId },
//     { $pull: { replies: { replyId: params.replyId } } },
//     { new: true }
//   )
//     .then((dbdbSocialData) => res.json(dbSocialData))
//     .catch((err) => res.json(err));
// },
// // remove comment; delete document while returning data
// removeComment({ params }, res) {
//   Comment.findOneAndDelete({ _id: params.commentId })
//     .then((deletedComment) => {
//       if (!deletedComment) {
//         return res.status(404).json({ message: "No comment with this id!" });
//       }
//       return Pizza.findOneAndUpdate(
//         { _id: params.socialId },
//         { $pull: { comments: params.commentId } },
//         { new: true }
//       );
//     })
//     .then((dbSocialData) => {
//       if (!dbSocialData) {
//         res
//           .status(404)
//           .json({ message: "No social data found with this id!" });
//         return;
//       }
//       res.json(dbSocialData);
//     })
//     .catch((err) => res.json(err));
// },

module.exports = userController;
