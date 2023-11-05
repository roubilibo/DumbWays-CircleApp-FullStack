import { API } from "@/libs/API";
import { useQuery } from "@tanstack/react-query";

export function useUserProfile() {
	const {
		data: profileData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["user-profile"],
		queryFn: async () => {
			const { data } = await API.get("/user");
			return data;
		},
	});
	return {
		profileData,
		isLoading,
		error,
	};
}
