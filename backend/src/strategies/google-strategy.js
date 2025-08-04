import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";
import config from "../config.js";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const findUser = await User.findById(id);
  done(null, findUser);
});

export default passport.use(
  new Strategy(
    {
      clientID: config.googleClientID,
      clientSecret: config.googleClientSecret,
      callbackURL: config.googleCallbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      const email = emails[0].value;

      try {
        // 1. Check if the user already exists with this Google ID
        let user = await User.findOne({ googleId: id });
        if (user) {
          return done(null, user);
        }

        // 2. Check if the user already exists with this email
        user = await User.findOne({ email });
        if (user) {
          // If they exist, link their Google ID to their existing account
          user.googleId = id;
          await user.save();
          return done(null, user);
        }

        // 3. Handle new user creation and potential username conflicts
        let newUsername = displayName;
        let existingUserWithUsername = await User.findOne({
          username: newUsername,
        });

        // If the username already exists, create a unique one
        while (existingUserWithUsername) {
          const randomSuffix = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit number
          newUsername = `${displayName}${randomSuffix}`;
          existingUserWithUsername = await User.findOne({
            username: newUsername,
          });
        }

        // 4. Create the new user with a guaranteed unique username
        const newUser = new User({
          googleId: id,
          username: newUsername,
          email: email,
        });

        const savedUser = await newUser.save();
        return done(null, savedUser);
      } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(error, null);
      }
    }
  )
);
