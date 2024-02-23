const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

//user is the new table name 
const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;