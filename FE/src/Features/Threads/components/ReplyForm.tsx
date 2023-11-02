import {
	Avatar,
	Box,
	Button,
	FormControl,
	HStack,
	Input,
} from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/type/RootState";
import { usePostReply } from "../Hooks/usePostReply";

export default function ReplyForm() {
	const user = useSelector((state: RootState) => state.auth);
	const {
		handleButtonClick,
		handleChange,
		handlePost,
		setImage,
		isPending,
		fileInputRef,
		form,
	} = usePostReply();

	return (
		<form encType="multipart/form-data">
			<FormControl>
				<HStack mt={5} justify="space-between">
					<HStack w={"full"}>
						<Avatar
							size="sm"
							mr={3}
							name={user.fullname}
							src={user.profile_picture}
						/>
						<Input
							variant="unstyled"
							color="whiteAlpha.400"
							placeholder="What is happening?!"
							_focus={{ color: "white" }}
							name="content"
							onChange={handleChange}
							value={form.content}
						/>
					</HStack>
					<HStack>
						<Box cursor="pointer">
							<BiImageAdd size={25} color="green" onClick={handleButtonClick} />
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
							onClick={() => handlePost()}
							isLoading={isPending}>
							Post
						</Button>
					</HStack>
				</HStack>
			</FormControl>
		</form>
	);
}
