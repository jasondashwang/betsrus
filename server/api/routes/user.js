const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../db/models/User');

// Here is where rest of routes fit in
// router.use('/leagues', require('./leagues'))
router.post('/register', (req, res) => {
  const userData = {
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  };

  User.create(userData, (err, user) => {
    if (err) {
      console.error(err);
      res.status(400).send(err);
    } else {
      res.status(200).end();
      // TODO: reroute to profile
    }
  });
});

router.post('/authenticate', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({
    username: username
  }).then((user) => {
    // Check that the given password matches user's password
    if (bcrypt.compareSync(password, user.password)) {
      res.status(200).send();
      // TODO: reroute to profile; set cookies
    } else {
      res.status(401).send();
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

module.exports = router;