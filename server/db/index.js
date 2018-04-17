var mongoose = require('mongoose');
var options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
};

mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URL, options).then(() => {
}).catch((err) => {
	console.log(err);
});

var db = mongoose.connection;
