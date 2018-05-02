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

			user = removeJsonAttrs(user,["password"]);

      res.json(user);
    }
  });
});

// from stackexchange question
function removeJsonAttrs(json,attrs){
    return JSON.parse(JSON.stringify(json,function(k,v){
        return attrs.indexOf(k)!==-1 ? undefined: v;
}));}

router.post('/authenticate', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({
    username: username
  }).populate('leagues').exec().then((user) => {
    // Check that the given password matches user's password
    if (bcrypt.compareSync(password, user.password)) {
			user = removeJsonAttrs(user,["password"]);
      res.json(user);
    } else {
      res.status(401).send();
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
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
