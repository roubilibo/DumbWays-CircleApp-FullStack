import { ThreadPost } from "@/Types/ThreadAPI";
import { API } from "@/libs/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useRef, useState } from "react";

export function usePostThread() {
	const [form, setForm] = useState<ThreadPost>({
		content: "",
	});

	const QueryClient = useQueryClient();
	const fileInputRef = useRef<HTMLInputElement>(null);

	function handleButtonClick() {
		fileInputRef.current?.click();
	}

	const [image, setImage] = useState<File | null>(null);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setForm({
			...form,
			[e.target.name]: e.target.files ? e.target.files : e.target.value,
		});
	}

	const { mutate: handlePost, isPending } = useMutation({
		mutationFn: async () => {
			const formData = new FormData();
			if (image) {
				formData.append("image", image);
			}
			formData.append("content", form.content);
			await API.post("/thread", formData);
		},
		onSuccess: () => {
			QueryClient.invalidateQueries({ queryKey: ["thread"] });
			setForm({
				content: "",
			});
			setImage(null);
		},
	});

	// async function handlePost() {
	// 	// setIsPosting(true);
	// 	try {
	// 		console.log(form);
	// 		const formData = new FormData();
	// 		if (image) {
	// 			formData.append("image", image);
	// 		}
	// 		formData.append("content", form.content);
	// 		await API.post("/thread", formData);
	// 		// refetch();
	// 	} catch (error) {
	// 		console.log(error);
	// 	} finally {
	// 		// setIsPosting(false);
	// 		setForm({
	// 			content: "",
	// 		});
	// 		setImage(null);
	// 	}
	// }

	return {
		handleButtonClick,
		handleChange,
		handlePost,
		fileInputRef,
		isPending,
		setImage,
	};
}
