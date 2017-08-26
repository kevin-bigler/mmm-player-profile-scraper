const mongoose = require('mongoose');

// require schemas
const profileSnapshotSchemaJson = require('./schema/profile-snapshot');

class DB {
  /*
    Member Variables:
      db
      ProfileSnapshot
  */
  constructor() {
    // initialize database connection & database models
    this.initConnection();
    this.initModels();

    // this.saveProfileSnapshot({ name: 'Michael Scott', nintendoId: 'littlekidlover', snapshotDate: new Date() });
  }

  initConnection() {
    mongoose.connect('mongodb://localhost/mmm_player_profile_snapshots');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("we're connected!");
    });

    this.db = db;
  }

  initModels() {
    const profileSnapshotSchema = mongoose.Schema(profileSnapshotSchemaJson);
    const ProfileSnapshot = mongoose.model('profile_snapshot', profileSnapshotSchema);

    this.ProfileSnapshot = ProfileSnapshot;
  }

  saveProfileSnapshot(snapshot, cb = null) {
    // convert snapshot (PlayerProfileSnapshot) to our schema
    snapshot.savedDate = new Date();
    const profile = new this.ProfileSnapshot(obj);

    profile.save(cb); // cb params: error, profile
  }

  getLatestProfileSnapshot(nintendoId, cb) {
    // TODO
  }
}

module.exports = new DB();
