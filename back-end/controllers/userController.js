const UserModel = require("../models/Users");

exports.getProfileByID = (req, res) => {
  UserModel.find({ _id: req.params.userid }, { password: 0 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

exports.getFollowings = (req, res) => {
  const profileList = req.params.profileList.split(",");
  UserModel.find({ _id: { $in: profileList } }, { password: 0 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

exports.followProfile = (req, res) => {
  UserModel.findByIdAndUpdate(
    req.params.userID,
    { $push: { followings: req.params.profileID } },
    { new: true }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

exports.unfollowProfile = (req, res) => {
  UserModel.findByIdAndUpdate(
    req.params.userID,
    { $pull: { followings: req.params.profileID } },
    { new: true }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};
