import { Request, Response } from "express";
import FollowServices from "../services/FollowServices";

class FollowControllers {
	followUser(req: Request, res: Response) {
		FollowServices.followUser(req, res);
	}
	getFollowingUsers(req: Request, res: Response) {
		FollowServices.getFollowingUsers(req, res);
	}
	getFollowerUsers(req: Request, res: Response) {
		FollowServices.getFollowerUsers(req, res);
	}
}

export default new FollowControllers();
