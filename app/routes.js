const express = require('express');

const bodyParser = require('body-parser');
const bodyParserJson = bodyParser.json();

const chalk = require('chalk');

const nintendoIdValidator = require('./middleware/nintendo-id-validator');
const Scraper = require('./scraper');
const db = require('./db/db');

const router = express.Router();

router.use(bodyParserJson);

router.get('/latest', nintendoIdValidator, (request, response) => {
	// console.log('request body: ', request.body);

	const {nintendoId} = request.body;
	// console.log(chalk.yellow(`nintendoId: ${nintendoId}`));
	// TODO look up this player in db
	// -- if not found, 404
	console.log('db:', db);

	response.status(200);
	response.json({message: 'All right.', starCount: 100});	// TODO return player profile snapshot
});

router.get('/scrape', nintendoIdValidator, (request, response) => {
	// console.log('request body: ', request.body);

	const {nintendoId} = request.body;
	// console.log(chalk.yellow(`nintendoId: ${nintendoId}`));
	// scrape this player, save in db, return player info if successful
	// TODO save player profile snapshot in db
	const scraper = new Scraper();
	scraper.scrapePlayerProfile(nintendoId, (error, playerProfileSnapshot) => {
		// console.log(chalk.yellow('scrapePlayerProfile() callback'));
		if (error) {
			// console.log('-error block');
			response.status(404).json({error});
		} else {
			// console.log('-ok block');
			response.status(200).json(playerProfileSnapshot);
		}
	});

	// response.status(200);
	// response.json({message: 'All right.', starCount: 100});	// TODO return player profile snapshot
});

module.exports = router;