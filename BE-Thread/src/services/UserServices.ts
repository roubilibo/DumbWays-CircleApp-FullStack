import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Response, Request } from "express";
import { createUserSchema } from "../utils/Validator/Threads";

class UserServices {
	private readonly UserRepository: Repository<User> =
		AppDataSource.getRepository(User);

	async find(req: Request, res: Response): Promise<Response> {
		try {
			const users = await this.UserRepository.find();
			return res.status(200).json(users);
		} catch (error) {
			res.status(500).json({ error: "error while getting users" });
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;
			const { error, value } = createUserSchema.validate(data);
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}
			const user = this.UserRepository.create({
				username: value.username,
				fullname: value.fullname,
				email: value.email,
				password: value.password,
				profile_picture: value.profile_picture,
				bio: value.bio,
			});
			const createUser = await this.UserRepository.save(user);
			return res.status(200).json(createUser);
		} catch (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
	}

	async findOne(req: Request, res: Response): Promise<Response> {
		try {
			const id = parseInt(req.params.id);
			const user = await this.UserRepository.findOne({
				where: { id: id },
			});
			return res.status(200).json(user);
		} catch (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
	}
	async update(req: Request, res: Response): Promise<Response> {
		try {
			const id = parseInt(req.params.id);
			const data = req.body;
			const { error, value } = createUserSchema.validate(data);
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}
			const user = await this.UserRepository.findOne({
				where: { id: id },
			});
			user.fullname = value.fullname;
			user.username = value.username;
			user.email = value.email;
			user.password = value.password;
			user.profile_picture = value.profile_picture;
			user.bio = value.bio;
			const updateUser = await this.UserRepository.save(user);
			return res.status(200).json(updateUser);
		} catch (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		try {
			const id = parseInt(req.params.id);
			const user = await this.UserRepository.findOne({
				where: { id: id },
			});
			const deleteUser = await this.UserRepository.remove(user);
			return res.status(200).json(deleteUser);
		} catch (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
	}
}

export default new UserServices();
