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
import { useThreads } from "../Hooks/useThreads";
import { BiImageAdd } from "react-icons/bi";

export default function ThreadForm() {
	const { handlePost, handleChange, fileInputRef, handleButtonClick } =
		useThreads();

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
								onChange={handleChange}
								style={{ display: "none" }}
								ref={fileInputRef}
							/>
							{/* <Button
								variant={"ghost"}
								color={"brand.green"}
								onClick={handleButtonClick}>
								<BiImageAdd
									style={{
										height: "50px",
										width: "50px",
									}}
								/>
							</Button> */}
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
