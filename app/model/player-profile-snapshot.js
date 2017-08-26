class PlayerProfileSnapshot {
	// TODO add unit test(s) for this constructor!
	constructor(props = {}) {
		const {username, nintendoId, snapshotDate} = props;
		let stats;
		if (props.stats) {
			// TODO other stats
			const {starCount} = props.stats;
			stats = {
				starCount
			};
		} else {
			stats = {
				starCount: undefined
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