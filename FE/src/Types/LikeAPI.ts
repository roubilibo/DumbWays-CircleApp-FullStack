import { ThreadApi } from "./ThreadAPI";
import { UserAPI } from "./UserAPI";

type LikeAPI = {
	id: number;
	thread: ThreadApi;
	user: UserAPI;
};

export default LikeAPI;
