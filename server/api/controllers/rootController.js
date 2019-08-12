
exports.root = function (req,res) {
  res.json({
    message: `You're logged in as ${res.locals.user.email} with Firebase UID: ${
      res.locals.user.uid
      }`
  });
}