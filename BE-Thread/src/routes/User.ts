import * as express from "express";
import { Router } from "express";
import UserControllers from "../controllers/UserControllers";
import Auth from "../middlewares/Auth";
import uploadImage from "../middlewares/UploadImage";
const UserRouter = Router();
UserRouter.get("/users", UserControllers.find);
UserRouter.post("/user", UserControllers.create);
UserRouter.get("/user", Auth.authenticate, UserControllers.findOne);
UserRouter.patch(
	"/user",
	Auth.authenticate,
	uploadImage.single("profile_picture"),
	UserControllers.update
);
UserRouter.delete("/user/:id", UserControllers.delete);
UserRouter.post("/register", UserControllers.register);
UserRouter.post("/login", UserControllers.login);
UserRouter.get("/auth/check", Auth.authenticate, UserControllers.check);
UserRouter.post("/logout", UserControllers.logout);
export default UserRouter;
