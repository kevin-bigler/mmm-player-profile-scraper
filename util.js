const util = {
	playerNintendoIdIsValid(nintendoId) {
		/* regex: [\w\-\_\.]+ */
		if (typeof nintendoId !== 'string') {
			throw new TypeError('nintendoId is not a string');
		}

		const matches = nintendoId.match(/[\w\-\_\.]+/g);
		return matches && matches.length && matches.length === 1;
	}
};

module.exports = util;