class PlayerProfileSnapshot {
	// TODO add unit test(s) for this constructor!
	constructor(props = {}) {
		const {username, nintendoId, snapshotDate} = props;
		const stats;
		if (props.stats) {
			// TODO other stats
			const {starCount} = props.stats;
			stats = {
				starCount
			};
		}
		// member fields / properties
		Object.assign(this, {
			username,
			nintendoId,
			snapshotDate,
			stats
		});
	}
}

module.exports = PlayerProfileSnapshot;