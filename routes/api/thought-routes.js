// set up for Express.js
const router = require("express").Router();

// import functionality & hook it up w/ routes, using controller method as callback
const {
  getAllThought,  
  getThoughtById,  
  addThought, 
  updateThought,  
  removeThought,
  addReaction,
  removeReaction
} = require("../../controllers/thought-controller");

// api route for thoughts
router.route("/").get(getAllThought);

// api route for /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// api route for /api/thought/<userID>/<thoughtId>
router
  .route("/:userId/:thoughtId")
  .put(updateThought)
  .get(getThoughtById)
  .post(addReaction)
  .delete(removeReaction)
  .delete(removeThought);

// api route for /api/thoughts/<userId>/<thoughtId>/<reactionId>
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;
