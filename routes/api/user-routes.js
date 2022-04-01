// import methods from user-controller file
const router = require("express").Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  newFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// api route for /api/user, using controller method as callback
router.route("/").get(getAllUser).post(createUser);

// api route for /api/user/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// api route /api/users/:Id/friends/:friendsId
router.route("/:userId/friends/:friendId").post(newFriend).delete(deleteFriend);

module.exports = router;
