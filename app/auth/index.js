const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
  const authProcessor = (accessToken, refreshToken, profile, done) => {
    // Find user in local db using profile.id
    // if the user is found, return user data using done();
    // if user is not found, create one in the local db and return
  };

  passport.use(new FacebookStrategy(config.fb, authProcessor));
};
