const mongoose = require('mongoose');

// TODO add unit tests for this class, mocking mongoose (?)

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
  }

  initConnection() {
    mongoose.connect('mongodb://localhost/mmm_player_profile_snapshots');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      // TODO may want to delay further execution until we successfully connect to db (get to this block)
    });

    this.db = db;
  }

  initModels() {
    const profileSnapshotSchema = mongoose.Schema(profileSnapshotSchemaJson);
    const ProfileSnapshot = mongoose.model('profile_snapshot', profileSnapshotSchema);

    this.ProfileSnapshot = ProfileSnapshot;
  }

  saveProfileSnapshot(snapshot, cb = null) {
    // convert snapshot (PlayerProfileSnapshot) to our schema (this.ProfileSnapshot)
    snapshot.savedDate = new Date();
    const profile = new this.ProfileSnapshot(snapshot);

    profile.save(cb); // cb params: error, profileSnapshot
  }

  getLatestProfileSnapshot(nintendoId, cb) {
    this.ProfileSnapshot
      .findOne()
      .where('nintendoId').equals(nintendoId)
      .sort('-snapshotDate')
      .exec(cb);  // cb params: error, profileSnapshot
  }
}

module.exports = new DB();
