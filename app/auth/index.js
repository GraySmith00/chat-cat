const passport = require('passport');
const config = require('../config');
const h = require('../helpers');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await h.findById(id);
      done(null, user);
    } catch (err) {
      console.log('Error when deserializing user: ', err);
    }
  });

  const authProcessor = async (accessToken, refreshToken, profile, done) => {
    // Find user in local db using profile.id
    try {
      const result = await h.findOne(profile.id);
      if (result) {
        done(null, result);
      } else {
        // create a new user and return
        const newChatUser = await h.createNewUser(profile);
        done(null, newChatUser);
      }
    } catch (err) {
      console.log(err);
    }

    // if the user is found, return user data using done();
    // if user is not found, create one in the local db and return
  };

  passport.use(new FacebookStrategy(config.fb, authProcessor));
};
