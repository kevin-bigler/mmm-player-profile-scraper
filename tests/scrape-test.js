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
					testSnapshot = snapshot;
					done();
				});
			});

		});

		describe('Has Correct Property Values', function(){

			it('deep includes our expected result', function() {
				expect(testSnapshot).to.deep.include(scrapeTestJson);
			});

			it('contains snapshotDate', function() {
				expect(testSnapshot.snapshotDate).to.be.a('date');
			})

		});

	});

});
