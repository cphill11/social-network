// hook the routes set up in user-routes.js & thought-routes into the entire server
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// export routes; add prefixes to routes in user & thought-routes.js
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;