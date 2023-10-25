import LikeAPI from "./LikeAPI";
import ReplyAPI from "./ReplyAPI";
import UserAPI from "./UserAPI";

type ThreadAPI = {
    id: number;
    content: string;
    image: string;
    user: UserAPI;
    replies: ReplyAPI[];
    likes: LikeAPI[];
};

export default ThreadAPI;
