// import methods from comment-controller file
const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
  } = require('../../controllers/user-controller');

// Set up GET all and POST at /api/social, using controller method as callback
router
  .route('/')
  .get(getAllUser)
  .post(createUser);


  // Set up GET one, PUT, and DELETE at /api/social/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// ???? routes to update and delete comments
// // /api/comments/<socialId>
// router.route('/:userId').post(addUser);

// // /api/comments/<socialId>/<commentId>
// router
//   .route('/:socialId/:commentId')
//   .put(addReply)
//   .delete(removeComment)

//   router.route('/:socialId/:commentId/:replyId').delete(removeReply);

module.exports = router;