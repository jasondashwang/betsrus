const router = require('express').Router();

router.use('/user', require('./routes/user'));
router.use('/prediction', require('./routes/prediction'));

// 404 API middleware
router.use((req, res, next) => {
  res.status(404).send('Not found');
});

module.exports = router;
