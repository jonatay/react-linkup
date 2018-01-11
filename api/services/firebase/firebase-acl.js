// require Firebase and get instance to firebase path
var Firebase = require('firebase');
var fb = new Firebase(process.env.FIREBASE_DATABASE_URL);

// enable firebase client data caching by using on() listener (optional)
fb.on('value', function(dataSnapshot) {
  // no need to do anything here
});

// require acl and create Firebase backend
var acl = require('acl');
acl = new acl(new acl.firebaseBackend(fb));

module.exports = acl;