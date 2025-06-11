const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Log Google profile for debugging
    console.log("Google Profile:", profile);

    // Check if user exists
    let user = await User.findOne({ googleId: profile.id });

    // If user exists, return
    if (user) return done(null, user);

    // If not, create new user
    user = await User.create({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails && profile.emails[0].value,
      profileImage: profile.photos && profile.photos[0].value,
    });

    return done(null, user);
  } catch (error) {
    console.error("Passport Error:", error);
    return done(error, null);
  }
}));

// Only needed if you use sessions (not required for JWT-based auth)
// Included here just for completeness but not used
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
