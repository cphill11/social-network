// hook the routes set up in social-routes.js into the entire server
const router = require('express').Router();
const socialRoutes = require('./social-routes');

// add prefix of `/social` to routes created in `social-routes.js`
router.use('/social', socialRoutes);

module.exports = router;