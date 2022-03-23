// set up for Express.js
const router = require('express').Router();

// import functionality & hook it up w/ routes, using controller method as callback
const {
    getAllSocial,
    getSocialById,
    createSocial,
    updateSocial,
    deleteSocial
  } = require('../../controllers/social-controller');



// Set up GET all and POST at /api/social, using controller method as callback
router
  .route('/')
  .get(getAllSocial)
  .post(createSocial);

// Set up GET one, PUT, and DELETE at /api/social/:id
router
  .route('/:id')
  .get(getSocialById)
  .put(updateSocial)
  .delete(deleteSocial);

module.exports = router;