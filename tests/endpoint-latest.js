let request = require('supertest');
let app = require('../app');

console.log();
console.log('------------------------------------------------------------------');
console.log('TESTS');
console.log();
console.log();
console.log();

describe('Requests to the Get-Latest Path [GET /latest]', function() {

	const nintendoId = 'joe-cool.1980_Dude';

	it('Returns a 200 status code', function(done) {

		request(app)
			.get('/latest')
			.send({nintendoId})
			.expect(200, done);

	});

	it('Returns json', function(done) {

		request(app)
			.get('/latest')
			.send({nintendoId})
			.expect('Content-Type', /json/, done);

	});

	it('Returns starCount', function(done) {

		request(app)
			.get('/latest')
			.send({nintendoId})
			.expect(/starCount/i, done);
			
	});

	describe('Returns a 400 Bad Request', function() {

		it('when no nintendoId present', function(done) {

			request(app)
				.get('/latest')
				.expect(400, done);

		});

		it('when nintendoId is invalid: not a string', function(done) {

			request(app)
				.get('/latest')
				.send({nintendoId:1})
				.expect(400, done);

		});

		it('when nintendoId is invalid: does not match regex (invalid characters)', function(done) {

			request(app)
				.get('/latest')
				.send({nintendoId:'$(*&)'})
				.expect(400, done);

		});

		it('when nintendoId is invalid: does not match regex (empty string)', function(done) {

			request(app)
				.get('/latest')
				.send({nintendoId:''})
				.expect(400, done);

		});

		it('when nintendoId is invalid: does not match regex (whitespace only)', function(done) {

			request(app)
				.get('/latest')
				.send({nintendoId:'       '})
				.expect(400, done);

		});

	});

});