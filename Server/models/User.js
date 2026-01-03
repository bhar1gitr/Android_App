const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    voterId: {
        type: String,
        required: true,
        unique: true, // Prevents duplicate registrations
        uppercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    // CRITICAL FOR VOTING APPS
    hasVoted: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    }
}, { timestamps: true });

// Remove 'next' from the arguments
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return; // Just return, don't call next()

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        throw err; // Mongoose handles the error if you throw it
    }
});
module.exports = mongoose.model('User', UserSchema);

