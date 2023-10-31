export type UserAPI = {
	id: number;
	email: string;
	// password: string;
	fullname: string;
	bio: string;
	profile_picture: string;
	username: string;
};

export type UserRegister = {
	fullname: string;
	username: string;
	email: string;
	password: string;
};

export type UserLogin = {
	email: string;
	password: string;
};
