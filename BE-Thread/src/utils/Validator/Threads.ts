import * as Joi from "joi";

export const createTHreadSchema = Joi.object({
	content: Joi.string(),
	image: Joi.string().allow(""),
	user: Joi.number(),
});

export const updateTHreadSchema = Joi.object({
	content: Joi.string(),
	image: Joi.string().allow(""),
});

export const createUserSchema = Joi.object({
	username: Joi.string().required(),
	fullname: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().required(),
	profile_picture: Joi.string().allow(null, ""),
	bio: Joi.string().allow(null, ""),
});
export const updateUserSchema = Joi.object({
	username: Joi.string(),
	fullname: Joi.string(),
	email: Joi.string(),
	password: Joi.string(),
	profile_picture: Joi.string().allow(null, ""),
	bio: Joi.string().allow(null, ""),
});

export const createReplySchema = Joi.object({
	thread: Joi.number(),
	content: Joi.string(),
	image: Joi.string().allow("", null),
});

export const updateReplySchema = Joi.object({
	content: Joi.string(),
	image: Joi.string().allow(""),
});

export const likeSchema = Joi.object({
	user: Joi.number(),
	thread: Joi.number(),
});

export const loginSchema = Joi.object({
	email: Joi.string(),
	password: Joi.string(),
});

export const FollowSchema = Joi.object({
	user: Joi.number(),
});
