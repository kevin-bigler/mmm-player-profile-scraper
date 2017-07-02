const { assert } = require('chai');  // Using Assert style
const { expect } = require('chai');  // Using Expect style

const chalk = require('chalk');

const Scraper = require('../app/scraper');

describe('Scraper module', function() {
	const scraper = new Scraper();
	const nintendoId = 'thek3vinator';
	let testSnapshot = null;

	before(function(done) {
		console.log('before()');

		scraper.scrapePlayerProfile(nintendoId, (error, playerProfileSnapshot) => {
			console.log(chalk.yellow('scrapePlayerProfile() callback in scrape-test.js'));
			testSnapshot = playerProfileSnapshot;
			done(error);
		});

	});

	it('Does stuff right', function() {
		console.log('testSnapshot: ', testSnapshot);
		assert.equal(true, true);
	});

});
