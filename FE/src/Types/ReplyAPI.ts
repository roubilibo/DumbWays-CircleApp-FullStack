import ThreadAPI from "./ThreadAPI";
import UserAPI from "./UserAPI";

type ReplyAPI = {
	id: number;
	image: string;
	content: string;
	thread: ThreadAPI;
	user: UserAPI;
};

export default ReplyAPI;
