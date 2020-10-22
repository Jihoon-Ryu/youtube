import express from "express";
import routes from "../routes";
import {
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

//대상.get(주어, 동사 함수 : 정의역=>치역)

userRouter.get(routes.userDetail(), userDetail);

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

export default userRouter;
