const mongoose = require('mongoose');
const profileSnapshotSchemaJson = require('./schema/profile-snapshot');

class DB {
  /*
    Properties:
      db
      ProfileSnapshot
  */
  constructor() {
    console.log('class DB: constructor');

    // init database connection
    mongoose.connect('mongodb://localhost/mmm_player_profile_snapshots');
    const db = mongoose.connection;
    this.db = db;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("we're connected!");
    });

    // init database models
    const profileSnapshotSchema = mongoose.Schema(profileSnapshotSchemaJson);
    const ProfileSnapshot = mongoose.model('profile_snapshot', profileSnapshotSchema);
    this.ProfileSnapshot = ProfileSnapshot;

    this.saveProfileSnapshot({ name: 'Michael Scott', nintendoId: 'littlekidlover', snapshotDate: new Date() });
  }

  saveProfileSnapshot(snapshot) {
    // TODO convert snapshot (PlayerProfileSnapshot) to our schema
    const obj = {
      name: snapshot.name,
      nintendoId: snapshot.nintendoId,
      snapshotDate: snapshot.snapshotDate,
      savedDate: new Date()
    };
    const profile = new this.ProfileSnapshot(obj);

    profile.save(function(error, profile) {
    	if (error) return console.error(error);

    	console.log('successfully saved ' + profile.name);
    });
  }
}

module.exports = new DB();
