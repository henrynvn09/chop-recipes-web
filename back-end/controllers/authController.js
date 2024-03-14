// controllers/authController.js
const jwt = require('jsonwebtoken');
const UserModel = require('../models/Users');
require("dotenv").config({ path: "./config.env" });
const ACCESS_TOKEN_SECRET = process.env.ACCESS_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_SECRET;

exports.login = (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((users) => {
    if (users) {
      if (users.password === password) {
        UserID = users._id;
        const accessToken = jwt.sign(
          { email: email },
          ACCESS_TOKEN_SECRET,
          { expiresIn: "1m" }
        );
        const refreshToken = jwt.sign(
          { email: email },
          REFRESH_TOKEN_SECRET,
          { expiresIn: "24h" }
        );
        res.cookie("accessToken", accessToken, { maxAge: 60000 });
        res.cookie("refreshToken", refreshToken, {
          maxAge: 86400000,
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });
        return res.json({
          Login: true,
          UserID: UserID,
          message: "login successful",
        });
      } else {
        res.json({ Login: false, message: "password incorrect" });
      }
    } else {
      res.json("user not found");
    }
  });
};

exports.logout = (req, res) => {
    // Make sure to include both req and res here
  // Clear the accessToken cookie
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  // Clear the refreshToken cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.json({ Logout: true, message: "Successfully logged out" });
};

exports.signup = (req, res) => {
    UserModel.findOne({ email: req.body.email }).then((users) => {
    if (users) {
      res.json("user already exists");
    } else {
      UserModel.create(req.body)
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
    }
  });
};

exports.verifyUser = (req, res) => {
  return res.json({ valid: true, message: "testauhorizednew" });
};


// Add any other necessary functions and export them as needed
