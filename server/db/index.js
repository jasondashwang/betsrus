var mongoose = require('mongoose');

var url = "mongodb://bdognom.cs.brown.edu/cdquery";
var options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    useMongoClient: true
};

mongoose.Promise = Promise;
mongoose.connect(url, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));