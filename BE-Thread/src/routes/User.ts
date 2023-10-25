import * as express from "express";
import { Router } from "express";
import UserControllers from "../controllers/UserControllers";

const UserRouter = Router();
UserRouter.get("/users", UserControllers.find);
UserRouter.post("/user", UserControllers.create);
UserRouter.get("/user/:id", UserControllers.findOne);
UserRouter.patch("/user/:id", UserControllers.update);
UserRouter.delete("/user/:id", UserControllers.delete);

export default UserRouter;
