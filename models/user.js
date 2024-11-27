const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passwordLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
});

userSchema.plugin(passwordLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;