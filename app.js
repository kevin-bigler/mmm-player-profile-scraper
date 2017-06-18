let express = require('express');
let app = express();

const chalk = require('chalk');

// app.use(express.static('public'));
console.log(chalk.green('Node Environment: ' + process.env.NODE_ENV));

let cities = require('./routes/cities');
app.use('/cities', cities);

module.exports = app;	// do it this way, as a module, so that we can write tests using app