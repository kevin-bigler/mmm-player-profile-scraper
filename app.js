'use strict';

let express = require('express');
let app = express();

const chalk = require('chalk');

const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(chalk.green(`Node Environment: ${NODE_ENV}`));

let routes = require('./routes');
app.use('/', routes);

module.exports = app;	// do it this way, as a module, so that we can write tests using app