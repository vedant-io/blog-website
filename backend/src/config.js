import dotenv from "dotenv";
dotenv.config();

const config = {
  sessionSecret: process.env.SESSION_SECRET,
  googleClientID: process.env.CLIENT_ID,
  googleClientSecret: process.env.CLIENT_SECRET,
  googleCallbackURL: process.env.REDIRECT_URI,
  jwtSecret: process.env.JWT_SECRET,
  mongoURI: process.env.DATABASE_URL,
};

export default config;
