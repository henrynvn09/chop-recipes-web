const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    Image: {type: String, default: null},
});

//user is the new table name 
const UserModel = mongoose.model('chop_database', UserSchema, 'user');

module.exports = UserModel;