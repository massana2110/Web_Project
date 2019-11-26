// Change Password
router.post("/changepassword", function(req, res) {
  var email = req.body.email;
  var password = req.body.oldPassword;
  var newPassword = req.body.newPassword;

  User.changePassword(username, function(err, user) {
    if (err) throw err;
    if (user === null) {
      res.json({ success: false, msg: "The given username does not exist." });
    } else {
      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          User.changePassword(user, newPassword, function(
            err,
            changedPassword
          ) {
            if (err) throw err;
            else {
              if (changedPassword === true) {
                res.json({
                  success: true,
                  msg: "Your password has been changed."
                });
              } else {
                res.json({
                  success: false,
                  msg: "Your password was unable to be changed."
                });
              }
            }
          });
        }
      });
    }
  });
});
