import {
	Avatar,
	Box,
	Button,
	FormControl,
	HStack,
	Input,
} from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { usePostThread } from "../Hooks/usePostThread";

export default function ThreadForm() {
	const {
		handleButtonClick,
		handleChange,
		handlePost,
		setImage,
		isPending,
		fileInputRef,
	} = usePostThread();

	return (
		<form encType="multipart/form-data">
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
