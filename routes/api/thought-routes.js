// set up for Express.js
const router = require('express').Router();

// import functionality & hook it up w/ routes, using controller method as callback
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
  } = require('../../controllers/social-controllers');



// Set up GET all and POST at /api/social, using controller method as callback
router
  .route('/')
  .get(getAllThought)
  .post(createThought);

// Set up GET one, PUT, and DELETE at /api/social/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;