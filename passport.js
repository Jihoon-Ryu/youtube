import passport from "passport";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";
import dotenv from "dotenv";
dotenv.config();

//function :login
passport.use(User.createStrategy());

//Github login
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

//function :send user id number to cookie
passport.serializeUser(function (user, done) {
  done(null, user);
});

//function: read the id number into user
passport.deserializeUser(function (user, done) {
  done(null, user);
});
