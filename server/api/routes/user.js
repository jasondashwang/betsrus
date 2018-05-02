const router = require('express').Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
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
      res.json(user);
      req.session.userID = user.id;
      res.status(200).send();
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
      res.json(user);
      req.session.userID = user.id;
      res.status(200).send();
    } else {
      res.status(401).send();
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

router.get('/data', (req, res) => {
  // ID is not set (i.e user isn't logged in), send back nothing.
  if (req.session.userID === undefined || req.session.userID === null) {
    res.status(200).send();
  } else {
    User.findOne({
      _id: req.session.userID
    }, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).send();
      } else {
        const userObj = {};
        userObj.email = user.email;
        userObj.leagues = user.leagues;
        userObj.username = user.username;
        res.json(userObj);
        res.status(200).send();
      }
    });
  }
});

router.post('/changePassword', (req, res) => {
  if (req.body.password === undefined) {
    res.status(404).send();
  } else {
    User.findOneAndUpdate({ _id: req.body.userID },
      {$set: {password: bcrypt.hashSync(req.body.password, 10)}},
      {new: true})
    .exec((err, league) => {
      if (err) {
        console.error(err);
        res.status(500).send();
      } else {
        res.status(200).send();
      }
    });
  }
});

module.exports = router;
