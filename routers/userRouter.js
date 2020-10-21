import express from "express";
import routes from "../routes";
import {
  userDetail,
  getEditProfile,
  postEditProfile,
  changePassword,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

//대상.get(주어, 동사 함수 : 정의역=>치역)

userRouter.get(routes.userDetail(), userDetail);
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);

export default userRouter;
