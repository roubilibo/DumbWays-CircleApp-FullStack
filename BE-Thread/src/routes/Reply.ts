import { Router } from "express";
import ReplyControllers from "../controllers/ReplyControllers";
import Auth from "../middlewares/Auth";

const ReplyRouter = Router();
ReplyRouter.get("/replies", ReplyControllers.find);
ReplyRouter.get("/reply/:id", ReplyControllers.findOne);
ReplyRouter.post("/reply", Auth.authenticate, ReplyControllers.create);
ReplyRouter.patch("/reply/:id", ReplyControllers.update);
ReplyRouter.delete("/reply/:id", ReplyControllers.delete);

export default ReplyRouter;
