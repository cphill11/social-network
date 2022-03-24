// import the models we need
const { Comment, Pizza } = require("../models");

// create commentController object
const commentController = {
  // add comment to social data
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        return Social.findOneAndUpdate(
          { _id: params.socialId },
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then((dbSocialData) => {
        if (!dbSocialData) {
          res
            .status(404)
            .json({ message: "No social data found with this id!" });
          return;
        }
        res.json(dbSocialData);
      })
      .catch((err) => res.json(err));
  },
  // add reply
  addReply({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then((dbSocialData) => {
        if (!dbSocialData) {
          res
            .status(404)
            .json({ message: "No social data found with this id!" });
          return;
        }
        res.json(dbSocialData);
      })
      .catch((err) => res.json(err));
  },

  // remove reply
  removeReply({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then((dbdbSocialData) => res.json(dbSocialData))
      .catch((err) => res.json(err));
  },
  // remove comment; delete document while returning data
  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then((deletedComment) => {
        if (!deletedComment) {
          return res.status(404).json({ message: "No comment with this id!" });
        }
        return Pizza.findOneAndUpdate(
          { _id: params.socialId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then((dbSocialData) => {
        if (!dbSocialData) {
          res
            .status(404)
            .json({ message: "No social data found with this id!" });
          return;
        }
        res.json(dbSocialData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = commentController;
