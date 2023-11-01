import { API } from "@/libs/API";
import { useQuery } from "@tanstack/react-query";

export function useGetThread() {
	const {
		data: getThread,
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["thread"],
		// queryFn: async () => await API.get("/threads").then((res) => res.data),
		queryFn: async () => {
			const { data } = await API.get("/threads");
			return data;
		},
	});
	return { getThread, refetch, isLoading };
}
