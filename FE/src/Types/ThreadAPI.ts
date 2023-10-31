import LikeAPI from "./LikeAPI";
import ReplyAPI from "./ReplyAPI";
import { UserAPI } from "./UserAPI";

export type ThreadApi = {
	id: number;
	content: string;
	image: string;
	user: UserAPI;
	replies?: ReplyAPI[];
	likes?: LikeAPI[];
};

export type ThreadPost = {
	content: string;
	image: string | Blob | MediaSource;
	user: number;
};
