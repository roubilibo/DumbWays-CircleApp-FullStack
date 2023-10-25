import { Request, Response } from "express";
import ReplyServices from "../services/ReplyServices";

class ReplyControllers {
	find(req: Request, res: Response) {
		ReplyServices.find(req, res);
	}
	findOne(req: Request, res: Response) {
		ReplyServices.findOne(req, res);
	}
	create(req: Request, res: Response) {
		ReplyServices.create(req, res);
	}
	update(req: Request, res: Response) {
		ReplyServices.update(req, res);
	}
	delete(req: Request, res: Response) {
		ReplyServices.delete(req, res);
	}
}

export default new ReplyControllers();
