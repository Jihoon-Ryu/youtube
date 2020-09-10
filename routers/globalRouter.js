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
} from "../controllers/userController";
// ../는 대상이 현위치 밖에 있을 때 쓴다.

const globalRouter = express.Router();

//대상.get(주어, 동사 함수 : 정의역=>치역)
globalRouter.get(routes.home, home);
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;
