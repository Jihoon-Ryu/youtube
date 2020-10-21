import express from "express";
import routes from "../routes";
import { home } from "../controllers/videoController";
import { search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogIn,
  facebookLogin,
  postFacebookLogin,
  getMe,
} from "../controllers/userController";
// ../는 대상이 현위치 밖에 있을 때 쓴다.
import { onlyPublic, onlyPrivate } from "../middlewares";
import passport from "passport";

const globalRouter = express.Router();

//대상.get(주어, 동사 함수 : 정의역=>치역)
globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.search, search);

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogIn
);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  postFacebookLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
