import {
	Avatar,
	Box,
	Button,
	Divider,
	FormControl,
	HStack,
	Image,
	Input,
	Text,
} from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/type/RootState";
import { usePostReply } from "../Hooks/usePostReply";
import { Replies } from "@/Types/ReplyAPI";

type RepliesProps = {
	threadReply: {
		replies: Replies[];
	};
};

export default function ReplyForm({ threadReply }: RepliesProps) {
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
		<>
			<form encType="multipart/form-data">
				<FormControl mb={15}>
					<HStack
						mt={5}
						p={15}
						justify="space-between"
						border={"1px solid white"}
						borderRadius={"full"}>
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
								placeholder="Reply to this thread!"
								_focus={{ color: "white" }}
								name="content"
								onChange={handleChange}
								value={form.content}
							/>
						</HStack>
						<HStack>
							<Box cursor="pointer">
								<BiImageAdd
									size={25}
									color="green"
									onClick={handleButtonClick}
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
								onClick={() => handlePost()}
								isLoading={isPending}>
								Post
							</Button>
						</HStack>
					</HStack>
				</FormControl>
			</form>
			{threadReply.replies.map((reply: Replies) => (
				<Box key={reply.id} px="12" pt="3">
					<Box display="flex" gap="8px">
						<Avatar
							name={reply.user.fullname}
							src={reply.user.profile_picture}
							size="sm"
							mr="3"
							_hover={{
								cursor: "pointer",
							}}
						/>
						<Text fontWeight="semibold" fontSize="xs" color={"white"}>
							{reply.user.fullname}
						</Text>
					</Box>
					<Box px={12} py={3}>
						{reply.image && (
							<Image
								src={reply.image}
								boxSize="200px"
								objectFit="cover"
								alt="Dan Abramov"
								rounded="md"
								mb={3}
							/>
						)}
						<Text color={"white"} fontSize="xs">
							{reply.content}
						</Text>
					</Box>
					<Divider />
				</Box>
			))}
		</>
	);
}
