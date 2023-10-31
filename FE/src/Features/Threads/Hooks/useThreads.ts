import { ThreadPost, ThreadApi } from "@/Types/ThreadAPI";
import { API } from "@/libs/API";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

export function useThreads() {
	const [form, setForm] = useState<ThreadPost>({
		content: "",
		image: "",
		user: 1,
	});

	const { data: getThreads, refetch } = useQuery<ThreadApi[]>({
		queryKey: ["thread"],
		queryFn: async () => await API.get("/threads").then((res) => res.data),
	});

	async function handlePost(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData();
		formData.append("content", form.content);
		formData.append("image", form.image as File);

		await API.post("/thread", formData);
		refetch();
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value, files } = event.target;

		if (files) {
			setForm({
				...form,
				[name]: files[0],
			});
		} else {
			setForm({
				...form,
				[name]: value,
			});
		}
	}
	const fileInputRef = useRef<HTMLInputElement>(null);

	function handleButtonClick() {
		fileInputRef.current?.click();
	}

	return {
		form,
		getThreads,
		handleChange,
		handlePost,
		fileInputRef,
		handleButtonClick,
	};
}
