import {
	Avatar,
	Box,
	Flex,
	HStack,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { useState } from "react";
import { ThreadApi } from "@/Types/ThreadAPI";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/type/RootState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/libs/API";

function BaseThread(props: ThreadApi) {
	const { content, image, user, replies, likes, id } = props;

	const [like, setLike] = useState({
		thread: id,
	});
	const userId = useSelector((state: RootState) => state?.auth);

	const queryClient = useQueryClient();

	const { mutate: handleLike } = useMutation({
		mutationFn: () => {
			return API.post(`like`, like);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["thread"] });
		},
		onError: (error) => {
			console.log(error);
		},
	});

	function handleClick() {
		setLike({ thread: id });
		handleLike();
	}

	const { isOpen, onOpen, onClose } = useDisclosure();
	// console.log(user.profile_picture);

	return (
		/* Hide the default scrollbar */
		<Flex gap={3} borderBottom="1px solid gray">
			<Avatar size="sm" name={user.fullname} src={user.profile_picture} />
			<Box mb={4} w={"full"}>
				<HStack>
					<Text
						display="flex"
						gap={1}
						fontSize="sm"
						fontWeight="semibold"
						color="whiteAlpha.800"
						// onClick={onClick}
						cursor="pointer">
						{user.fullname}
						<Text fontWeight="light" display="flex" color="whiteAlpha.600">
							<BsDot color="gray" size={24} />@{user.username}
							{/* {time} */}
						</Text>
					</Text>
				</HStack>
				<Flex width={"100%"} justifyContent={"space-between"}>
					<Link to={`/thread/${id}`}>
						<Box>
							<Text fontSize="xs" color="whiteAlpha.800" fontWeight="light">
								{content}
							</Text>
						</Box>
					</Link>
					<Box>
						{image && (
							<Image
								src={image}
								objectFit="cover"
								objectPosition="center"
								w="50px"
								h="50px"
								mr="10px"
								cursor="pointer"
								borderRadius={2.5}
								onClick={onOpen}
							/>
						)}
					</Box>
				</Flex>
				{/*?/ modal image  */}
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent bg="transparent">
						<ModalBody m={0} p={0}>
							{image && (
								<Flex justifyContent="center" alignItems="center" height="100%">
									<Image
										src={image}
										alt={user.fullname}
										maxW="800px"
										maxH="600px"
									/>
								</Flex>
							)}
						</ModalBody>
					</ModalContent>
				</Modal>
				<HStack spacing={6}>
					<HStack
						onClick={handleClick}
						cursor="pointer"
						color="whiteAlpha.600"
						mt={2}>
						<AiFillHeart
							size={20}
							color={
								likes?.map((like) => like.user.id).includes(userId.id)
									? "red"
									: ""
							}
						/>
						<Text fontSize="sm" color="whiteAlpha.600">
							{likes?.length}
						</Text>
					</HStack>
					<Link to={`/thread/${id}`}>
						<HStack cursor="pointer" color="whiteAlpha.600" mt={2}>
							<BiCommentDetail size={20} />
							<Text fontSize="sm" color="whiteAlpha.600">
								{replies?.length}
							</Text>
						</HStack>
					</Link>
				</HStack>
			</Box>
		</Flex>
	);
}

export default BaseThread;
