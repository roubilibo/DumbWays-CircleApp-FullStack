import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Thread } from "../entities/Thread";
import { Response, Request } from "express";
import {
	createTHreadSchema,
	updateTHreadSchema,
} from "../utils/Validator/Threads";

class ThreadServices {
	private readonly ThreadRepository: Repository<Thread> =
		AppDataSource.getRepository(Thread);

	async find(req: Request, res: Response): Promise<Response> {
		try {
			const threads = await this.ThreadRepository.find({
				relations: ["user", "replies", "likes"],
				select: {
					user: {
						id: true,
						fullname: true,
						email: true,
					},
				},
			});
			return res.status(200).json(threads);
		} catch (error) {
			res.status(500).json({ error: "error while getting threads" });
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;

			const { error, value } = createTHreadSchema.validate(data);
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}
			console.log(value);
			const thread = this.ThreadRepository.create({
				content: value.content,
				image: value.image,
				user: value.user,
			});
			const createThread = await this.ThreadRepository.save(thread);
			return res.status(200).json(createThread);
		} catch (error) {
			res.status(500).json({ error: "error while creating thread" });
		}
	}

	async findOne(req: Request, res: Response): Promise<Response> {
		try {
			const id = parseInt(req.params.id);
			const thread = await this.ThreadRepository.findOne({
				where: { id: id },
			});
			return res.status(200).json(thread);
		} catch (error) {
			res.status(500).json({ error: "error while getting thread" });
		}
	}

	async update(req: Request, res: Response): Promise<Response> {
		try {
			const id = parseInt(req.params.id);
			const thread = await this.ThreadRepository.findOne({
				where: { id: id },
			});
			const data = req.body;
			const { error, value } = updateTHreadSchema.validate(data);
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}
			thread.content = value.content;
			thread.image = value.image;
			const updateThread = await this.ThreadRepository.save(thread);
			return res.status(200).json(updateThread);
		} catch (error) {
			res.status(500).json({ error: "error while updating thread" });
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		try {
			const id = parseInt(req.params.id);
			const thread = await this.ThreadRepository.findOne({
				where: { id: id },
			});
			const deleteThread = await this.ThreadRepository.delete(thread);
			return res.status(200).json(deleteThread);
		} catch (error) {
			res.status(500).json({ error: "error while deleting thread" });
		}
	}
}

export default new ThreadServices();
