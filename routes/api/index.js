// hook the routes set up in user-routes.js & thought-routes into the entire server
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// export routes
router.use('/user', userRoutes);
// add prefix of /thought to routes created in thought-routes.js
router.use('/thought', thoughtRoutes);

module.exports = router;