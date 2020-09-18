import passport from "passport";
import User from "./models/User";

//function :login
passport.use(User.createStrategy());

//function :send user id number to cookie
passport.serializeUser(User.serializeUser());

//function: read the id number into user
passport.deserializeUser(User.deserializeUser());
