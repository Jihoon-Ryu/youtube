import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import {
  facebookLoginCallback,
  githubLoginCallback,
} from "./controllers/userController";
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

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://0104ed8c2d29.ngrok.io${routes.facebookCallback}`,
      //`http://localhost:4000${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"],
    },
    facebookLoginCallback
  )
);

//function :send user id number to cookie
passport.serializeUser(function (user, done) {
  done(null, user);
});

//function: read the id number into user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
/*
passport.deserializeUser(function (user, done) {
  done(null, user);
}); */
