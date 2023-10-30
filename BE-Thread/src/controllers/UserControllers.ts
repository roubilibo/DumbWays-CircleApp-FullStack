import { Request, Response } from "express";
import UserServices from "../services/UserServices";

class UserControllers {
	find(req: Request, res: Response) {
		UserServices.find(req, res);
	}
	create(req: Request, res: Response) {
		UserServices.create(req, res);
	}
	findOne(req: Request, res: Response) {
		UserServices.findOne(req, res);
	}
	update(req: Request, res: Response) {
		UserServices.update(req, res);
	}
	delete(req: Request, res: Response) {
		UserServices.delete(req, res);
	}
	register(req: Request, res: Response) {
		UserServices.register(req, res);
	}
	login(req: Request, res: Response) {
		UserServices.login(req, res);
	}
	check(req: Request, res: Response) {
		UserServices.check(req, res);
	}
	logout(req: Request, res: Response) {
		UserServices.logout(req, res);
	}
}

export default new UserControllers();
