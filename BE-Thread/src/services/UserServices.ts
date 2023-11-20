import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Response, Request } from "express";
import {
	createUserSchema,
	loginSchema,
	updateUserSchema,
} from "../utils/Validator/Threads";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { uploadToCloudinary } from "../utils/Cloudinary/Cloudinary";
import { deleteFile } from "../utils/Cloudinary/FIleHelper";

class UserServices {
	private readonly UserRepository: Repository<User> =
		AppDataSource.getRepository(User);

	async find(req: Request, res: Response): Promise<Response> {
		try {
			const users = await this.UserRepository.find();
			return res.status(200).json({ code: 200, data: users });
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
			const id = res.locals.loginSession.user.id;
			const user = await this.UserRepository.findOne({
				where: { id: id },
				relations: ["following", "followers", "threads"],
			});
			return res.status(200).json(user);
		} catch (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
	}
	async update(req: Request, res: Response): Promise<Response> {
		try {
			// const id = parseInt(req.params.id);
			const data = req.body;
			const { error, value } = updateUserSchema.validate(data);
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}
			const user = await this.UserRepository.findOne({
				where: { id: res.locals.loginSession.id },
			});

			if (value.password) {
				const hashedPassword = await bcrypt.hash(value.password, 10);
				value.password = hashedPassword;
			}
			let profile_picture = "";
			if (req.file?.filename) {
				profile_picture = await uploadToCloudinary(req.file);
				deleteFile(req.file.path);
			}

			user.fullname = value.fullname;
			user.username = value.username;
			user.email = value.email;
			user.profile_picture = profile_picture;
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

	async register(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;
			const { error, value } = createUserSchema.validate(data);
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}
			const checkEmail = await this.UserRepository.count({
				where: { email: value.email },
			});
			if (checkEmail > 0) {
				return res.status(400).json({
					error: "Email already exists",
				});
			}
			const password = await bcrypt.hash(value.password, 10);

			const user = this.UserRepository.create({
				username: value.username,
				fullname: value.fullname,
				email: value.email,
				password: password,
				// profile_picture: value.profile_picture,
				// bio: value.bio,
			});
			const createUser = await this.UserRepository.save(user);
			return res.status(200).json(createUser);
		} catch (error) {
			return res.status(400).json({ error });
		}
	}

	async login(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;

			const { error, value } = loginSchema.validate(data);
			if (error) {
				return res.status(400).json({
					error: "Invalid email or password",
				});
			}

			const checkEmail = await this.UserRepository.findOne({
				where: { email: value.email },
				select: {
					id: true,
					password: true,
					email: true,
					username: true,
					fullname: true,
					profile_picture: true,
					bio: true,
				},
			});
			if (!checkEmail) {
				return res.status(400).json({
					error: "Invalid email or password",
				});
			}

			const checkPassword = await bcrypt.compare(
				value.password,
				checkEmail.password
			);
			if (!checkPassword) {
				return res.status(400).json({
					error: "Invalid email or password",
				});
			}

			// const user = this.UserRepository.create({
			// 	id: checkEmail.id,
			// 	username: checkEmail.username,
			// 	fullname: checkEmail.fullname,
			// 	email: checkEmail.email,
			// 	profile_picture: checkEmail.profile_picture,
			// 	bio: checkEmail.bio,
			// });
			const token = jwt.sign({ id: checkEmail.id }, "secret", {
				expiresIn: "6h",
			});
			return res.status(200).json({ user: checkEmail, token });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Internal server error" });
		}
	}

	async check(req: Request, res: Response): Promise<Response> {
		try {
			const loginSession = res.locals.loginSession;
			const user = await this.UserRepository.findOne({
				where: { id: loginSession.id },
			});
			return res.status(200).json({ user, message: "you are logged in" });
		} catch (error) {
			return res.status(401).json({ error: "Unauthorized" });
		}
	}

	async logout(req: Request, res: Response): Promise<Response> {
		try {
			// Clear the user's session or token here
			// For example, if you're using cookies:
			res.clearCookie("session");
			// return res.status(200).redirect("/auth/login");
			return res.status(200).json({ message: "Logout successful" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Internal server error" });
		}
	}
}

export default new UserServices();
