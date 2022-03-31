// import methods from user-controller file
const router = require("express").Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

// GET all users
// GET 1 user by _id, populate thought & friend data
// POST a new user 
    // EX: {
        // "username": "HoserP",
        // "email": "H@gmail.com"
        // } 
// PUT to update a user by its _id
// DELETE to remove user by its _id

// Set up GET all and POST at /api/user, using controller method as callback
router.route("/").get(getAllUser).post(createUser);

// Set up GET one, PUT, and DELETE at /api/user/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendsId
// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list

// router.route("/:userId").post(addUser);

// /api/users/:userId/friends/:friendsId
// router
//   .route('/:userId/:friendsId')
//   .put(addFriend)
//   .delete(removeFriend)

//   router.route('/:userId/:friendsId').delete(removeFriend);

module.exports = router;
