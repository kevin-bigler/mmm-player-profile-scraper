const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');

const ScrapeHelper = require('./helper/scrape-helper');

const util = require('./util');
const PlayerProfileSnapshot = require('./model/player-profile-snapshot');

class Scraper {
	constructor() {
		this.scrapeHelper = new ScrapeHelper();
	}

	scrapePlayerProfile(nintendoId, cb) {
		const playerProfileUrl = util.getPlayerProfileUrl(nintendoId);
		// console.log('Getting player profile info from URL: ' + chalk.blue(playerProfileUrl));

		request(playerProfileUrl, (error, response, body) => {
			// first, check error cases
			if (error) {
				// console.log(chalk.bgRed('request error: ' + error));
				cb(error);
				return;
			} else if (!response) {
				// console.log(chalk.red('No response'));
				cb(new Error('No response'));
				return;
			} else if ( response.statusCode !== 200) {
				// console.log(chalk.red('Response Status: ' + response.statusCode));
				const errorObject = new Error('Player Profile not found');
				// console.log('errorObject: ', errorObject);
				cb('Player Profile not found');
				return;
			}

			// go ahead with parsing if no errors occurred
			this.parsePlayerProfileSnapshot(body, cb);
		});
	}

	parsePlayerProfileSnapshot(html, cb) {
		// TODO parse each property here
		const $ = cheerio.load(html);

		const playerProfileSnapshot = new PlayerProfileSnapshot();
		// console.log('new PlayerProfileSnapshot with no values in constructor:', playerProfileSnapshot);

		playerProfileSnapshot.snapshotDate = new Date();
		playerProfileSnapshot.nintendoId = $('#contents > div.sns-share-wrapper').attr('data-page-id');
		playerProfileSnapshot.username = $('div.profile div.profile-info div.user-info div.name').text();
		playerProfileSnapshot.stats.starCount = +this.scrapeHelper.parseTypographyNumber($('.profile-two-column-wrapper .liked-count .star > .liked-count'));

		// console.log('player profile snapshot after scraping: ', playerProfileSnapshot);

		cb(null, playerProfileSnapshot);
	}
}

module.exports = Scraper;