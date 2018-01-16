var admin = require("./firebase-admin");

// As an admin, the app has access to read and write all data, regardless of Security Rules

var db = admin.database();
var ref = db.ref('acl');
ref.on("value", function(dataSnapshot) {
  console.log(dataSnapshot.val());
});

// require acl and create Firebase backend
var acl = require('acl');
var firebaseBackend = require('./firebase-acl-backend/');

acl = new acl(new acl.firebaseBackend(ref));

module.exports = acl;

//1OEzjouzdISFnVJWDImBg88yOro2

