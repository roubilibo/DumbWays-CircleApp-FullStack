import { Router } from "express";
import LikeController from "../controllers/LikeController";
import Auth from "../middlewares/Auth";

const LikeRouter = Router();
LikeRouter.get("/likes", LikeController.find);
LikeRouter.get("/like/:id", LikeController.findOne);
LikeRouter.post("/like", Auth.authenticate, LikeController.create);
LikeRouter.delete("/like/:id", LikeController.delete);

export default LikeRouter;
