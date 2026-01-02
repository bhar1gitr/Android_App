const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    epic: { type: String, unique: true },
    booth: String
});

// CHECK THIS LINE: It must be exactly like this
module.exports = mongoose.model('Voter', voterSchema);