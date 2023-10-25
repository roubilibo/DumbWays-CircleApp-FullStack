import * as Joi from "joi";

export const createTHreadSchema = Joi.object({
	content: Joi.string(),
	image: Joi.string(),
	user: Joi.number(),
});

export const updateTHreadSchema = Joi.object({
	content: Joi.string(),
	image: Joi.string(),
});

export const createUserSchema = Joi.object({
	username: Joi.string().required(),
	fullname: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().required(),
	profile_picture: Joi.string(),
	bio: Joi.string(),
});

export const createReplySchema = Joi.object({
	thread_id: Joi.number(),
	user_id: Joi.number(),
	content: Joi.string(),
	image: Joi.string().allow(null),
});

export const updateReplySchema = Joi.object({
	content: Joi.string(),
	image: Joi.string().allow(null),
});

export const likeSchema = Joi.object({
	user: Joi.number(),
	thread: Joi.number(),
});
