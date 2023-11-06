import { API } from "@/libs/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState, useRef } from "react";

export function useUpdateProfile() {
	const [form, setForm] = useState({
		username: "",
		fullname: "",
		bio: "",
		profile_picture: "",
	});

	const [image, setImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const queryClient = useQueryClient();
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setForm({
			...form,
			[e.target.name]: e.target.files ? e.target.files : e.target.value,
		});
	}
	// const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setValue(e.target.name, e.target.files ? e.target.files : e.target.value);
	// };
	function handleButtonClick() {
		fileInputRef.current?.click();
	}
	const { mutate: updateUser, isPending: isUpdating } = useMutation({
		mutationFn: async () => {
			const formData = new FormData();

			if (image) {
				formData.append("profile_picture", image);
			}
			formData.append("username", form.username);
			formData.append("fullname", form.fullname);
			formData.append("bio", form.bio);
			return await API.patch("/user", formData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user-profile"] });
		},
		onError: (err) => {
			console.log(err);
		},
	});

	return {
		form,
		setForm,
		updateUser,
		isUpdating,
		handleChange,
		setImage,
		handleButtonClick,
		fileInputRef,
	};
}
