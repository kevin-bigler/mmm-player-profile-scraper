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

	// look up this player in db; if not found, 404
	const {nintendoId} = request.body;
	db.getLatestProfileSnapshot(nintendoId, (error, profileSnapshot) => {
		if (!error) {
			response.status(200).json(profileSnapshot);
		} else {
			// TODO return different status (not just 404) based on the error
			response.status(404).json({error});
		}
	});

});

router.get('/scrape', nintendoIdValidator, (request, response) => {

	// scrape this player, save in db, return player info if successful
	const {nintendoId} = request.body;
	const scraper = new Scraper();
	scraper.scrapePlayerProfile(nintendoId, (error, playerProfileSnapshot) => {
		if (!error) {
			// TODO save player profile snapshot in db
			db.saveProfileSnapshot(playerProfileSnapshot, (error, savedSnapshot) => {
				// TODO may want to return an error status if db failed to save?
				// -- but still return the snapshot object, in addition to the error
			});
			response.status(200).json(playerProfileSnapshot);
		} else {
			// TODO probably want to return different errors besides 404, based on what error occurred
			response.status(404).json({error});
		}
	});

});

module.exports = router;