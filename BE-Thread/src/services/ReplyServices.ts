import { Repository } from "typeorm";
import { Reply } from "../entities/Reply";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import {
	createReplySchema,
	updateReplySchema,
} from "../utils/Validator/Threads";
import { uploadToCloudinary } from "../utils/Cloudinary/Cloudinary";
import { deleteFile } from "../utils/Cloudinary/FIleHelper";
class ReplysServices {
	private readonly ReplyRepository: Repository<Reply> =
		AppDataSource.getRepository(Reply);

	async find(req: Request, res: Response): Promise<Response> {
		try {
			const replies = await this.ReplyRepository.find({
				relations: ["thread", "user"],
				select: {
					thread: {
						id: true,
						content: true,
					},
					user: {
						id: true,
						fullname: true,
						email: true,
					},
				},
			});
			return res.status(200).json({ code: 200, data: replies });
		} catch (error) {
			res.status(500).json({ error: "error while getting replies" });
		}
	}
	async findOne(req: Request, res: Response): Promise<Response> {
		try {
			const id = parseInt(req.params.id);
			const reply = await this.ReplyRepository.findOne({
				where: { id: id },
				relations: ["thread", "user"],
				select: {
					thread: {
						id: true,
						content: true,
					},
					user: {
						id: true,
						fullname: true,
						email: true,
					},
				},
			});
			return res.status(200).json(reply);
		} catch (error) {
			res.status(500).json({ error: "error while getting reply" });
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		try {
			const data = {
				content: req.body.content,
				image: req.file?.path || null,
			};
			const { error, value } = createReplySchema.validate(data);
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}
			let image = "";
			if (req.file?.filename) {
				image = await uploadToCloudinary(req.file);

				deleteFile(req.file.path);
			}
			console.log(value);
			const reply = this.ReplyRepository.create({
				thread: value.thread,
				user: res.locals.loginSession.user.id,
				content: value.content,
				image: image,
			});
			const createReply = await this.ReplyRepository.save(reply);
			return res.status(200).json(createReply);
		} catch (error) {
			console.log(error);

			res.status(500).json({ error: "error while creating reply" });
		}
	}
	async update(req: Request, res: Response): Promise<Response> {
		try {
			const id = parseInt(req.params.id);
			const reply = await this.ReplyRepository.findOne({
				where: { id: id },
				relations: ["thread", "user"],
			});
			if (!reply) {
				return res.status(404).send("Reply not found");
			}
			const data = req.body;
			const { error, value } = updateReplySchema.validate(data);
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}
			reply.content = value.content;
			reply.image = value.image;
			const updateReply = await this.ReplyRepository.save(reply);
			return res.status(200).json(updateReply);
		} catch (error) {
			res.status(500).json({ error: "error while updating reply" });
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);
			const reply = await this.ReplyRepository.findOne({
				where: { id: id },
				relations: ["thread", "user"],
			});
			if (!reply) {
				return res.status(404).send("Reply not found");
			}
			const replyDeleted = await this.ReplyRepository.remove(reply);
			return res.status(200).send(replyDeleted);
		} catch (error) {
			console.log(error);
			return res.status(500).send(error);
		}
	}
}

export default new ReplysServices();
