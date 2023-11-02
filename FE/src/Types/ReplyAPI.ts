import { ThreadApi } from "./ThreadAPI";
import { UserAPI } from "./UserAPI";

export type ReplyAPI = {
	id: number;
	image: string;
	content: string;
	thread: ThreadApi;
	user: UserAPI;
};

export type PostReply = {
	thread: number;
	content: string;
};

export type Replies = {
	content : string;
	created_at : string;
	id: number,
	image: string;
	user: UserAPI;
	thread: ThreadApi;
}