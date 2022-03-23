// hook the routes set up in social-routes.js into the entire server
const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const socialRoutes = require('./social-routes');

// export routes
router.use('/comments', commentRoutes);
// add prefix of `/social` to routes created in `social-routes.js`
router.use('/social', socialRoutes);

module.exports = router;