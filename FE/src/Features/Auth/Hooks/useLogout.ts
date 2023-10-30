import { useState } from "react";
import { API } from "@/libs/API";
// import { useNavigate } from "react-router-dom";

export function useLogout() {
	// const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	async function handleLogout() {
		setLoading(true);
		try {
			await API.post("/logout");
			localStorage.removeItem("token");
			// navigate("/auth/login");
			window.location.href = "/auth/login";
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	}

	return { loading, handleLogout };
}
