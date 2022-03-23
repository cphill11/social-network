// import methods from comment-controller file
const router = require('express').Router();
const {
    addComment,
    removeComment,
    addReply,
    removeReply
  } = require('../../controllers/comment-controller');

// routes to update and delete comments
// /api/comments/<socialId>
router.route('/:socialId').post(addComment);

// /api/comments/<socialId>/<commentId>
router
  .route('/:socialId/:commentId')
  .put(addReply)
  .delete(removeComment)

  router.route('/:socialId/:commentId/:replyId').delete(removeReply);

module.exports = router;