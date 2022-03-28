// // import the models we need
// const { User, Thought } = require("../models");

// // create commentController object
// const userController = {
//   // add comment 
//   addUser({ params, body }, res) {
//     console.log(body);
//     User.create(body)
//       .then(({ _id }) => {
//         return User.findOneAndUpdate(
//           { _id: params.userlId },
//           { $push: { users: _id } },
//           { new: true }
//         );
//       })
//       .then((dbUserlData) => {
//         if (!dbUserlData) {
//           res
//             .status(404)
//             .json({ message: "No user found with this id!" });
//           return;
//         }
//         res.json(dbUserlData);
//       })
//       .catch((err) => res.json(err));
//   },
//   // add reply
//   addReply({ params, body }, res) {
//     User.findOneAndUpdate(
//       { _id: params.userId },
//       { $push: { replies: body } },
//       { new: true, runValidators: true }
//     )
//       .then((dbUserlData) => {
//         if (!dbUserlData) {
//           res
//             .status(404)
//             .json({ message: "No user found with this id!" });
//           return;
//         }
//         res.json(dbUserlData);
//       })
//       .catch((err) => res.json(err));
//   },

//   // remove reply
//   removeReply({ params }, res) {
//     User.findOneAndUpdate(
//       { _id: params.commentId },
//       { $pull: { replies: { replyId: params.replyId } } },
//       { new: true }
//     )
//       .then((dbUserlData) => res.json(dbUserlData)
//       .catch((err) => res.json(err);
//   },
//   // remove comment; delete document while returning data
//   removeComment({ params }, res) {
//     User.findOneAndDelete({ _id: params.userId })
//       .then((deletedUser) => {
//         if (!deletedUser) {
//           return res.status(404).json({ message: "No user with this id!" });
//         }
//         return User.findOneAndUpdate(
//           { _id: params.userId },
//           { $pull: { user: params.userId } },
//           { new: true }
//         );
//       })
//       .then((dbUserlData) => {
//         if (!dbUserlData) {
//           res
//             .status(404)
//             .json({ message: "No user found with this id!" });
//           return;
//         }
//         res.json(dbUserlData);
//       })
//       .catch((err) => res.json(err));
//   },
// };

// module.exports = userController;
