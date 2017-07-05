const { assert } = require('chai');  // Using Assert style
const { expect } = require('chai');  // Using Expect style

const chalk = require('chalk');

const Scraper = require('../app/scraper');
const scrapeTestJson = require('./resources/scrape-test.json');

console.log('\n\n\n------------------------------------------------------------');

describe('Scraper module', function() {

	describe('::parsePlayerProfileSnapshot()', function() {

		const scraper = new Scraper();
		const nintendoId = 'thek3vinator';
		let testSnapshot = null;
		const testProps = [
			{
				key: 'starCount',
				skip: true
			},
			{
				key: 'username',
				skip: false
			}
		];

		before(function(done) {
			console.log('before()');

			scraper.scrapePlayerProfile(nintendoId, (error, playerProfileSnapshot) => {
				console.log(chalk.yellow('scrapePlayerProfile() callback in scrape-test.js'));
				testSnapshot = playerProfileSnapshot;
				// testSnapshot = {starCount:72};
				done(error);
			});

		});

		// ensure our testSnapshot equals scrapeTestJson from resources/scrape-test.json
		for (let prop of testProps) {
			const {key, skip} = prop;
			if (!skip) {
				it(`Has correct ${key}`, function() {
					assert.strictEqual(testSnapshot[key], scrapeTestJson[key]);
				});
			} else {
				it.skip(`Has correct ${key}`, function() {
					assert.strictEqual(testSnapshot[key], scrapeTestJson[key]);
				});
			}
		}

	});

});
