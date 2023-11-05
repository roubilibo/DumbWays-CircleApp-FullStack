import { API } from "@/libs/API";
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
	const {
		data: userLists,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const { data } = await API.get("/users");
			return data.data;
		},
	});

	return {
		userLists,
		isLoading,
		error,
	};
}
