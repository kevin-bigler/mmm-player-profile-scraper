const express = require('express');

const bodyParser = require('body-parser');
const bodyParserJson = bodyParser.json();

const chalk = require('chalk');

const nintendoIdValidator = require('./middleware/nintendo-id-validator');

const router = express.Router();

router.use(bodyParserJson);



router.get('/latest', nintendoIdValidator, (request, response) => {
	// console.log('request body: ', request.body);

	const {nintendoId} = request.body;
	// console.log(chalk.yellow(`nintendoId: ${nintendoId}`));

	response.status(200);
	response.json({message: 'All right.', starCount: 100});	// TODO player profile snapshot lookup, return
});

module.exports = router;