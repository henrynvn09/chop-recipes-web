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
exports.updateAvatar = (req, res) => {
  const { downloadURL } = req.body;
  console.log(req.params.userID);
  console.log(downloadURL);
  UserModel.findByIdAndUpdate(
    req.params.userID,
    {Image: downloadURL},
    { new: true }
  )
    .then((result) => {
      console.log("updated avatar");
    })
    .catch((err) => console.log(err));
};

exports.updateDescription = (req, res) => {
  const { description, userID } = req.body; // Get userID from the request body instead of req.params

  if (!userID) {
    // If userID is not provided, send a 400 response
    return res.status(400).send({ message: 'UserID is required.' });
  }

  UserModel.findById(userID) // Use the userID from the request body
    .then(user => {
      if (!user) {
        // If the user is not found, send a 404 response and terminate the promise chain
        return res.status(404).send({ message: 'User not found.' });
      }
      // User found, update the description
      user.description = description;
      return user.save(); // Save the updated user document
    })
    .catch(err => {
      console.error(err);
      // Ensure no response is sent after an error to avoid "Headers Already Sent" error
      if (!res.headersSent) {
        res.status(500).send({ message: 'Error updating user description.' });
      }
    });
}