const { assert } = require('chai');  // Using Assert style
const { expect } = require('chai');  // Using Expect style

const chalk = require('chalk');

const fs = require('fs');

const Scraper = require('../app/scraper');
const scrapeTestJson = require('./resources/scrape-test.json');

console.log('\n\n\n------------------------------------------------------------');

describe('Scraper module', function() {

	describe('Parse Player Snapshot [::parsePlayerProfileSnapshot()]', function() {

		const scraper = new Scraper();
		// const nintendoId = 'thek3vinator';
		let testSnapshot = null;

		before(function(done) {

			fs.readFile('./tests/resources/scrape-test.html', 'utf8', function(error, data) {
				if (error) {
					return done(error);
				}
				scraper.parsePlayerProfileSnapshot(data, (error, snapshot) => {
					if (error) {
						done(error);
					}
					// console.log('Snapshot: ', snapshot);
					// console.log('scrapeTestJson: ', scrapeTestJson);
					testSnapshot = snapshot;
					done();
				});
			});

		});

		describe('Has Correct Property Values', function(){

			// test each property (equality) individually
			// -- testSnapshot vs scrapeTestJson from resources/scrape-test.json
			const keys = Object.keys(scrapeTestJson);
			for (let key of keys) {

				it(`- ${key}`, function() {
					assert.strictEqual(testSnapshot[key], scrapeTestJson[key]);
				});

			}

		});

	});

});
