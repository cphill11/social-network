// hook the routes set up in user-routes.js & thought-routes into the entire server
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// export routes
router.use('/User', userRoutes);
// add prefix of `/social` to routes created in `social-routes.js`
router.use('/Thought', thoughtRoutes);

module.exports = router;