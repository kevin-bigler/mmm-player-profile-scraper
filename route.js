const express = require('express');

const bodyParser = require('body-parser');
const bodyParserJson = bodyParser.json();

const chalk = require('chalk');

const nintendoIdValidator = require('./middleware/nintendo-id-validator');
const Scraper = require('./scraper');

const router = express.Router();

router.use(bodyParserJson);

router.get('/latest', nintendoIdValidator, (request, response) => {
	// console.log('request body: ', request.body);

	const {nintendoId} = request.body;
	// console.log(chalk.yellow(`nintendoId: ${nintendoId}`));
	// TODO look up this player in db
	// -- if not found, 404

	response.status(200);
	response.json({message: 'All right.', starCount: 100});	// TODO return player profile snapshot
});

router.get('/scrape', nintendoIdValidator, (request, response) => {
	// console.log('request body: ', request.body);

	const {nintendoId} = request.body;
	// console.log(chalk.yellow(`nintendoId: ${nintendoId}`));
	// TODO scrape this player, save in db
	const scraper = new Scraper();
	scraper.scrapePlayerProfile(nintendoId, () => {
		console.log(chalk.yellow('scrapePlayerProfile() callback'));
	});

	response.status(200);
	response.json({message: 'All right.', starCount: 100});	// TODO return player profile snapshot
});

module.exports = router;