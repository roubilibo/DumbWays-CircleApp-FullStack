import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import Env from "../utils/Env/Env";
export default new (class Auth {
	authenticate(req: Request, res: Response, next: NextFunction): Response {
		const authorizationHeader = req.headers.authorization;

		if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
			return res.status(401).json({
				error: "unauthorized!",
			});
		}

		const token = authorizationHeader.split(" ")[1];

		try {
			const loginSession = jwt.verify(token, Env.JWT_SECRET);
			res.locals.loginSession = loginSession;
			next();
		} catch (err) {
			return res.status(401).json({
				error: "unauthorized!",
			});
		}
	}
})();
