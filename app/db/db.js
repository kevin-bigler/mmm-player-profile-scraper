const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mmm_player_profile_snapshots');
const db = mongoose.connection;

const profileSnapshotSchemaJson = require('./schema/profile-snapshot');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

const profileSnapshotSchema = mongoose.Schema(profileSnapshotSchemaJson);
const ProfileSnapshot = mongoose.model('profile_snapshot', profileSnapshotSchema);



const testProfile1 = new ProfileSnapshot({ name: 'cora bug is pretty cute!!!!!'});

testProfile1.save(function(error, testProfile1) {
	if (error) return console.error(error);

	console.log('successfully saved ' + testProfile1.name);
});

module.exports = db;