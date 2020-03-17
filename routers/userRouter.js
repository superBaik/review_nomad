
import express from "express";
import routes from "../routes"

import {
    users,
    userDetail,
    getEditProfile,
    postEditProfile,
    changePassword
  } from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";


 const userRouter = express.Router();



userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar ,postEditProfile);

userRouter.get(routes.changePassword,onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail); //위치중요 

export default userRouter;

