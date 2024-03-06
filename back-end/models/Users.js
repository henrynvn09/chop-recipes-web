const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Image: { type: String, default: "https://firebasestorage.googleapis.com/v0/b/chopuploadfiles.appspot.com/o/Default_pfp.png?alt=media&token=40b60ae7-a129-4365-9aed-790e32cc9028" },
  description: { type: String, default: null },
  followings: { type: Array, default: [] },
});

//user is the new table name
const UserModel = mongoose.model("chop_database", UserSchema, "user");

module.exports = UserModel;
