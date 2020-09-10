import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  editProfile,
  changePassword,
} from "../controllers/userController";

const userRouter = express.Router();

//대상.get(주어, 동사 함수 : 정의역=>치역)
userRouter.get(routes.users, users);
userRouter.get(routes.userDetail(), userDetail);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);

export default userRouter;
