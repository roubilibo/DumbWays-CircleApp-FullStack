import { useNavigate } from "react-router-dom";
import { useGetDetailThread } from "../Hooks/useGetDetailThread";
import {
	AbsoluteCenter,
	Avatar,
	Box,
	Button,
	Divider,
	HStack,
	Heading,
	Image,
	Text,
} from "@chakra-ui/react";
import { BiMessageAltDetail } from "react-icons/bi";
import { BsHeart } from "react-icons/bs";
import ReplyForm from "./ReplyForm";

export default function ThreadDetail() {
	const navigate = useNavigate();

	const { getDetailThread, isLoading } = useGetDetailThread();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		// <>
		// 	<Text fontSize={"2xl"} color={"white"}>
		// 		Thread Replies
		// 	</Text>
		// </>

		<Box>
			<Box color={"gray.100"}>
				<Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
					<Heading size="xl" pb={8}>
						Thread Replies
					</Heading>
					<Button onClick={() => navigate(-1)}>Back</Button>
				</Box>
				<HStack>
					<Box>
						<HStack>
							<Avatar
								name={getDetailThread.user.fullname}
								src={getDetailThread.user.profile_picture}
								size="sm"
								mr="3"
								_hover={{
									cursor: "pointer",
								}}
							/>
							<Box>
								<Text
									fontWeight="semibold"
									fontSize={"lg"}
									_hover={{
										cursor: "pointer",
									}}>
									{getDetailThread.user.fullname}
								</Text>
							</Box>
							<Text color="gray.600">&bull;</Text>
							<Box>
								{/* <chakra.time fontSize="2xs" color="gray.400">
									{formattedDate}
								</chakra.time> */}
							</Box>
						</HStack>
						<Box ms="3rem">
							{getDetailThread.image && (
								<Box mt="0.5rem">
									<Image
										boxSize="300px"
										objectFit="cover"
										src={getDetailThread.image}
										alt="Dan Abramov"
										rounded="md"
									/>
								</Box>
							)}

							<Box my="2">
								<Text fontSize="sm">{getDetailThread.content}</Text>
							</Box>
							<Box>
								<HStack fontSize="xs">
									<HStack>
										<BsHeart />
										<Text>10</Text>
									</HStack>

									<HStack>
										<BiMessageAltDetail />
										<Text>{getDetailThread.replies.length} Replies</Text>
									</HStack>
								</HStack>
							</Box>
						</Box>
					</Box>
				</HStack>

				<Box position="relative" padding="10">
					<Divider />
					<AbsoluteCenter bg="gray.800" px="4" rounded={"full"}>
						Replies
					</AbsoluteCenter>
				</Box>
			</Box>
			<ReplyForm threadReply={getDetailThread} />
		</Box>
	);
}
