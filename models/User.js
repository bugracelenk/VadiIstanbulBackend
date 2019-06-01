const sql = require("./db");

// //User object constructor
// const User = function(user) {
//   this.email = user.email;
//   this.password = user.password;
//   this.profile_id = user.profile_id;
// };

// //Profile object constructor
// const Profile = function(profile) {
//   this.f_name = profile.f_name;
//   this.l_name = profile.l_name;
//   this.phone_number = profile.phone_number;
//   this.address_id = address.address_id;
// };

// User.createUser = function createUser(newUser, profile, result) {};

// Profile.createProfile = function createProfile(newProfile, address, result) {};

exports.createNewUser = function(authData, profileData, result) {
  var auth = authData;
  var profile = profileData;
  sql.query("INSERT INTO profiles set ?", [profile], function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      auth = { ...authData, profile_id: res.insertId };
      sql.query("INSERT INTO users set ?", [auth], function(err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          console.log(res.insertId);
          result(null, res);
        }
      });
    }
  });
};

exports.getPassword = function(email, result) {
  sql.query("SELECT password FROM users WHERE email = ?", [email], function(
    err,
    res
  ) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res[0].password);
    }
  });
};

exports.checkEmail = function(email, result) {
  sql.query("SELECT email FROM users WHERE email = ?", [email], function(
    err,
    res
  ) {
    if (err) result(err, null);
    else {
      if (res.email) result(null, true);
      else result(null, false);
    }
  });
};

exports.getUserData = function(email, result) {
  sql.query("SELECT * FROM users WHERE email = ?", [email], function(err, res) {
    if (err) result(err, null);
    else {
      if (res) result(null, res);
    }
  });
};
