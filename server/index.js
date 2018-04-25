require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 1337; // uses environment variable, but if it does not exist, default to 1337

const serverconst = app.listen(PORT, () => {
  require('./db');
  console.log(`Server started on port ${PORT}`);
})

const io = require('socket.io')(server);

require('./sockets')(io);

// logging middleware comes first
app.use(volleyball);

// static serving middleware for anything in public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'AXMYSZAJERFML13JS',
  saveUninitialized: true,
  resave: true,
}));

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
    console.log('hello');
  	res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  }
);

// error handling endware
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
);
