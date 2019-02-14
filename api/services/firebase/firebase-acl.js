var admin = require('./firebase-admin');

// As an admin, the app has access to read and write all data, regardless of Security Rules

var db = admin.database();
var ref = db.ref('acl');
ref.once('value', function(dataSnapshot) {
  //console.log(dataSnapshot.val());
});

// require acl and createFromEmpDetailsParams Firebase backend
var acl = require('acl');
var firebaseBackend = require('./firebase-acl-backend/');

// var rollbar = require('../rollbar');

acl = new acl(new acl.firebaseBackend(ref) /*, rollbar*/);

module.exports = acl;
