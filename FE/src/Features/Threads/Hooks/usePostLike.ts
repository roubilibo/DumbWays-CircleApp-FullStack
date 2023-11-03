import { API } from "@/libs/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostLike() {
	const [likeId, setLikeId] = useState({
		thread: id,
	});

	const queryClient = useQueryClient();

	const { mutate: handleLike } = useMutation({
		mutationFn: () => {
			return API.post(`like`);
		},
	});
}
