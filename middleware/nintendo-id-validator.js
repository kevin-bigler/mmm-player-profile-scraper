const util = require('../util');

// middleware to validate nintendoId request field
const nintendoIdValidator = (request, response, next) => {
	// console.log('request body: ', request.body);

	const {nintendoId} = request.body;
	// console.log(chalk.yellow(`nintendoId: ${nintendoId}`));

	if ( typeof nintendoId === 'undefined' ) {
		response.status(400).json({error: 'Missing required field: nintendoId'});
		return;
	} else if ( typeof nintendoId !== 'string' ) {
		response.status(400).json({error: 'nintendoId must be a string, e.g. joebob1990'});
		return;
	} else if ( ! util.playerNintendoIdIsValid(nintendoId) ) {
		response.status(400).json({error: 'nintendoId is invalid. must not be blank. must only contain letters, numbers, underscores, dashes, and periods'});
	}

	next();
};

module.exports = nintendoIdValidator;