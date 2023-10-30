import * as express from "express";
import { Router } from "express";
import ThreadControllers from "../controllers/ThreadControllers";
import uploadImage from "../middlewares/UploadImage";
import Auth from "../middlewares/Auth";

const router = Router();
router.get("/threads", Auth.authenticate, ThreadControllers.find);
router.get("/thread/:id", ThreadControllers.findOne);
router.post(
	"/thread",
	Auth.authenticate,
	uploadImage.single("image"),
	ThreadControllers.create
);
router.patch("/thread/:id", ThreadControllers.update);
router.delete("/thread/:id", ThreadControllers.delete);

export default router;
