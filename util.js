const util = {
	playerNintendoIdIsValid(nintendoId) {
		/* regex: [\w\-\_\.]+ */
		if (typeof nintendoId !== 'string') {
			throw new TypeError('nintendoId is not a string');
		}

		const matches = nintendoId.match(/[\w\-\_\.]+/g);
		return matches && matches.length && matches.length === 1;
	},

	getPlayerProfileUrl(nintendoId) {
		return `https://supermariomakerbookmark.nintendo.net/profile/${nintendoId}?type=posted`;
	}
};

module.exports = util;