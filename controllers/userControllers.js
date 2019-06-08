const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.createNewUser = function(req, res) {
  var profileData = req.body.profileData;
  var authData = req.body.authData;
  // bcrypt.hash(req.body.password, 10, (err, hash) => {
  //   if (err)
  //     return res.status(500).json({
  //       message:
  //         "An error occured when trying to hash password. Please contact with the admin."
  //     });
  //   else authData = { ...authData, password: hash };
  // });
  //err handler
  // if (User.checkEmail(authData.email)) {
  //
  // } else {
  //   console.log(User.checkEmail(authData.email))
  //
  // }
  console.log(req.body)
  User.checkEmail(authData.email, function(err, email) {
    if (err) {
      console.log(err);
      return res.send(err);
    } else {
      if (!email) {
        console.log(email)
        return res
          .status(406)
          .json({ message: "This email is already taken " });
      } else {
        bcrypt.hash(authData.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              message:
                "Error: Some error occured when trying to hash password. Contact with the admin"
            });
          } else {
            authData = { ...authData, password: hash };
            User.createNewUser(authData, profileData, function(err, user) {
              if (err) return res.status(500).json({ message: err });
              else
                return res
                  .status(200)
                  .json({ message: "User Created Successfully", user });
            });
          }
        });
      }
    }
  });
};

exports.loginUser = function(req, res) {
  //check email first
  var token = "";
  User.checkEmail(req.body.email, function(err, email) {
    if (err) {
      console.log(err);
      return res.send(err);
    } else if (!email) {
      User.getPassword(req.body.email, function(err, pass) {
        if (err) return res.send(err);
        else
          bcrypt.compare(req.body.password, pass, (err, result) => {
            if (err) return res.send(err);
            if (result) {
              User.getUserData(req.body.email, (err, userData) => {
                if (err)
                  return res.status(500).json({ message: "internal error" });
                else {
                  token = jwt.sign(
                    {
                      id: userData[0].id,
                      email: userData[0].email,
                      profileId: userData[0].profile_id,
                      isSaler: userData[0].is_saler
                    },
                    "secret",
                    { expiresIn: "1h" }
                  );
                }
                return res
                  .status(200)
                  .json({ message: "Auth Successful", token });
              });
            } else return res.status(404).json({ message: "Auth Failed" });
          });
      });
    }
  });
};

// else return res.status(404).json({ message: "Auth Failed" });

exports.updateProfile = (req, res) => {
  User.updateProfile(
    req.body.updateData,
    req.userData.profileId,
    (err, result) => {
      if (err)
        return res.status(500).json({ err });
      if (err == null && result) return res.status(200).json({ message: "Update Success"});
    }
  );
};
