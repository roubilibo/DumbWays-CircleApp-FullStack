import { useParams } from "react-router-dom";
import { useToast } from "./useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useRef, useState } from "react";
import { PostReply } from "@/Types/ReplyAPI";
import { API } from "@/libs/API";

export function usePostReply() {
	const { id } = useParams();
	const toast = useToast();
	const queryClient = useQueryClient();
	const [form, setForm] = useState<PostReply>({
		content: "",
		thread: Number(id),
	});
	const [image, setImage] = useState<File | null>(null);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setForm({
			...form,
			[e.target.name]: e.target.files ? e.target.files : e.target.value,
		});
	}
	const fileInputRef = useRef<HTMLInputElement>(null);
	function handleButtonClick() {
		fileInputRef.current?.click();
	}
	const { mutate: handlePost, isPending } = useMutation({
		mutationFn: async () => {
			const formData = new FormData();
			if (image) {
				formData.append("image", image);
			}
			formData.append("content", form.content);
			formData.append("thread", form.thread.toString());
			await API.post("/thread", formData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["thread-reply"] });
			setForm({
				content: "",
				thread: Number(id),
			});
			setImage(null);
		},
	});

	return {
		form,
		handleButtonClick,
		handleChange,
		handlePost,
		setImage,
		isPending,
		fileInputRef,
		toast,
	};
}
