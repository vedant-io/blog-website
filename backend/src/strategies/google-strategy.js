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
        let user = await User.findOne({ googleId: id });

        if (user) {
          return done(null, user);
        }

        user = await User.findOne({ email });

        if (user) {
          user.googleId = id;
          await user.save();
          return done(null, user);
        }

        const newUser = new User({
          googleId: id,
          username: displayName,
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
