const mongoose = require('mongoose');
const profileSnapshotSchema = mongoose.Schema(profileSnapshotSchemaJson);
const ProfileSnapshot = mongoose.model('profile_snapshot', profileSnapshotSchema);