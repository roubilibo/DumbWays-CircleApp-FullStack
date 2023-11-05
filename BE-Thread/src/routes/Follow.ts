import { Router } from "express";
import Auth from "../middlewares/Auth";
import FollowControllers from "../controllers/FollowControllers";

const FollowRouter = Router();

FollowRouter.post("/follow", Auth.authenticate, FollowControllers.followUser);
FollowRouter.get(
	"/following",
	Auth.authenticate,
	FollowControllers.getFollowingUsers
);
FollowRouter.get(
	"/follower",
	Auth.authenticate,
	FollowControllers.getFollowerUsers
);

export default FollowRouter;
