const request = require('supertest');
const app = require('../app');

console.log();
console.log('------------------------------------------------------------------');
console.log('ENDPOINT-SCRAPE TESTS');
console.log();
console.log();
console.log();

describe('Requests to the Scrape Path [GET /scrape]', function() {

	const nintendoId = 'joe-cool.1980_Dude';

	it('Returns a 200 status code', function(done) {

		request(app)
			.get('/scrape')
			.send({nintendoId})
			.expect(200, done);

	});

	it('Returns json', function(done) {

		request(app)
			.get('/scrape')
			.send({nintendoId})
			.expect('Content-Type', /json/, done);

	});

	it('Returns starCount', function(done) {

		request(app)
			.get('/scrape')
			.send({nintendoId})
			.expect(/starCount/i, done);

	});

	describe('Returns a 400 Bad Request', function() {

		it('when no nintendoId present', function(done) {

			request(app)
				.get('/scrape')
				.expect(400, done);

		});

		it('when nintendoId is invalid: not a string', function(done) {

			request(app)
				.get('/scrape')
				.send({nintendoId:1})
				.expect(400, done);

		});

		it('when nintendoId is invalid: does not match regex (invalid characters)', function(done) {

			request(app)
				.get('/scrape')
				.send({nintendoId:'$(*&)'})
				.expect(400, done);

		});

		it('when nintendoId is invalid: does not match regex (empty string)', function(done) {

			request(app)
				.get('/scrape')
				.send({nintendoId:''})
				.expect(400, done);

		});

		it('when nintendoId is invalid: does not match regex (whitespace only)', function(done) {

			request(app)
				.get('/scrape')
				.send({nintendoId:'       '})
				.expect(400, done);

		});

	});

});