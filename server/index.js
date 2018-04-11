require('dotenv').config();

const path = require('path');
const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 1337; // uses environment variable, but if it does not exist, default to 1337

const server = app.listen(PORT, () => {
  console.log(process.env.DB_USER);
  console.log(process.env.DB_PASSWORD);
  console.log(`Server started on port ${PORT}`);
})

// logging middleware comes first
app.use(volleyball);

// static serving middleware for anything in public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

// 404 middleware
app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    res.status(404).send('Not found')
  } else {
    next();
  }
});

// send index.html
app.get('*', (req, res, next) => {
    var i = 1;
  	res.send(i);
  }
);

// error handling endware
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
);
