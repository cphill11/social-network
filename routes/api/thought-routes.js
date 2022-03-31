// set up for Express.js
const router = require("express").Router();

// import functionality & hook it up w/ routes, using controller method as callback
const {
  getAllThought,  // k
  getThoughtById,  // k
  createThought, // see line 13
  updateThought,  // PUT to update by its _id; k
  deleteThought, // by it's _id; k
} = require("../../controllers/thought-controller");

// POST a new thought; push through created thought's _id to assoc user's throughts array field
  // EX: {
  // "thoughtText": "random thought of day",
  // "username": "HoserP",
  // "userID": "5544Hut"
  // }


// Set up GET all and POST at /api/thought, using controller method as callback
router.route("/").get(getAllThought).post(createThought);

// Set up GET one, PUT, and DELETE at /api/thought/:id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
// POST to add a rxn stored in 1 thought's rxn array field
// DELETE to pull & remove a rxn by rxn's reactionId value

// router.route("/:thoughtId").post(addThought);

// /api/thoughts/:thoughtId/reactions
// router
//   .route('/:thoughtId/:reactionId')
//   .put(addReaction)
//   .delete(removeReaction)

//   router.route('/:thoughtId/:reactionId).delete(removeReaction);

module.exports = router;
