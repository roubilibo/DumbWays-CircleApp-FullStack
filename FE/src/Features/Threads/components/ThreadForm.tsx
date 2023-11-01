import { API } from "@/libs/API";
import {
	Avatar,
	Box,
	Button,
	FormControl,
	HStack,
	IconButton,
	// IconButton,
	Input,
} from "@chakra-ui/react";
import { useRef, useState, ChangeEvent } from "react";
import { BiImageAdd } from "react-icons/bi";

type formInputData = {
	content: string;
};

export default function ThreadForm() {
	const fileInputRef = useRef<HTMLInputElement>(null);

	function handleButtonClick() {
		fileInputRef.current?.click();
	}

	const [form, setForm] = useState<formInputData>({
		content: "",
	});

	const [image, setImage] = useState<File | null>(null);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setForm({
			...form,
			[e.target.name]: e.target.files ? e.target.files : e.target.value,
		});
	}

	async function handlePost() {
		console.log(form);
		const formData = new FormData();
		if (image) {
			formData.append("image", image);
		}
		formData.append("content", form.content);
		await API.post("/thread", formData);
	}

	return (
		<form onSubmit={handlePost} encType="multipart/form-data">
			<FormControl>
				<HStack mt={5} justify="space-between">
					<HStack>
						<Avatar size="sm" mr={3} />
						<Input
							variant="unstyled"
							color="whiteAlpha.400"
							placeholder="What is happening?!"
							_focus={{ color: "white" }}
							name="content"
							onChange={handleChange}
						/>
					</HStack>
					<HStack>
						<Box cursor="pointer">
							<IconButton
								bg={"transparent"}
								outline={"none"}
								aria-label="Add Image"
								// name="image"
								onClick={handleButtonClick}
								icon={<BiImageAdd size={25} color="green" />}
							/>
							<Input
								type="file"
								name="image"
								onChange={(e) => {
									if (e.target?.files) {
										setImage(e.target?.files[0]);
									} else {
										setImage(null);
									}
								}}
								style={{ display: "none" }}
								ref={fileInputRef}
							/>
						</Box>
						<Button
							colorScheme="whatsapp"
							size="xs"
							px={3}
							rounded="full"
							type="submit">
							Post
						</Button>
					</HStack>
				</HStack>
			</FormControl>
		</form>
	);
}
