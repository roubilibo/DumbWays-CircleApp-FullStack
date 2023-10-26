import ThreadAPI from "./ThreadAPI";
import UserAPI from "./UserAPI";

type LikeAPI = {
	id: number;
	thread: ThreadAPI;
	user: UserAPI;
};

export default LikeAPI;
