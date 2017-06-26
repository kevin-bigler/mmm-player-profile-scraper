const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');

const util = require('./util');
const PlayerProfileSnapshot = require('./model/player-profile-snapshot');

class Scraper {
	scrapePlayerProfile(nintendoId, cb) {
		const playerProfileUrl = util.getPlayerProfileUrl(nintendoId);
		console.log('Getting player profile info from URL: ' + chalk.blue(playerProfileUrl));

		/*
		request
			.get(playerProfileUrl)
			.on('error', (error) => {
				console.log(chalk.bgRed('request error: ' + error));
				cb(error);
			})
			.on('response', (response) => {
				console.log(chalk.green('Got response'));
				console.log(chalk.green('response keys: '), Object.keys(response));
				console.log(chalk.green(`statusCode: ${response.statusCode}`));
				if (response.statusCode !== 200) {
					cb(new Error("Player Profile not found"));
					return;
				}

				const playerProfileSnapshot = new PlayerProfileSnapshot();
				playerProfileSnapshot.starCount = 10; // TODO parse star count from response
			});
			// .pipe(process.stdout);
		*/

		request(playerProfileUrl, function (error, response, body) {
		  console.log('error:', error); // Print the error if one occurred
		  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		  console.log('body:', body && body.length); // Print the HTML for the Google homepage.

			if (error) {
				console.log(chalk.bgRed('request error: ' + error));
				cb(error);
				return;
			} else if (!response) {
				console.log(chalk.red('No response'));
				cb(new Error('No response'));
				return;
			} else if ( response.statusCode !== 200) {
				console.log(chalk.red('Response Status: ' + response.statusCode));
				const errorObject = new Error('Player Profile not found');
				// console.log('errorObject: ', errorObject);
				cb('Player Profile not found');
				return;
			}

			// TODO parse the response body here
			const $ = cheerio.load(body);
			const playerProfileSnapshot = new PlayerProfileSnapshot();
			playerProfileSnapshot.starCount = $('div.profile div.profile-info div.user-info div.name').text(); // TODO parse star count from the body
			console.log('player profile snapshot: ', playerProfileSnapshot);

			cb(null, playerProfileSnapshot);
		});
	}
}

module.exports = Scraper;