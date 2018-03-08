const router = require('express').Router();
module.exports = router;

// Here is where rest of routes fit in
// router.use('/leagues', require('./leagues'))

// 404 API middleware
router.use((req, res, next) => {
  res.status(404).send('Not found');
});
