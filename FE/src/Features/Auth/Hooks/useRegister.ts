import { UserRegister } from "@/Types/UserAPI";
import { API } from "@/libs/API";
import { ChangeEvent, useState } from "react";

export function UseRegister() {
	const [form, setForm] = useState<UserRegister>({
		fullname: "",
		username: "",
		email: "",
		password: "",
	});

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	async function handleRegister() {
		try {
			const response = await API.post("/register", form);
			console.log(response);

			window.location.href = "/auth/login";
		} catch (error) {
			console.log(error);
		}
	}

	return { form, handleChange, handleRegister };
}
