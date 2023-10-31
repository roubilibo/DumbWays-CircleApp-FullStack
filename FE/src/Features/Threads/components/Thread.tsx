import {
	Avatar,
	Box,
	Flex,
	HStack,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { useState } from "react";
import { ThreadApi } from "@/Types/ThreadAPI";

// interface IProps {
//     image?: string;
//     name?: string;
//     username?: string;
//     content?: string;
//     likes?: number;
//     comment?: number;
//     time?: string;
//     onClick?: () => void
// }
function BaseThread(props: ThreadApi) {
	const { content, image, user, replies, likes } = props;

	const [like, setLike] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();
	// console.log(user.profile_picture);
	function handleLike() {
		setLike(!like);
	}

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
							{user.username} <BsDot color="gray" size={24} />
							{/* {time} */}
						</Text>
					</Text>
				</HStack>
				<Flex width={"100%"} justifyContent={"space-between"}>
					<Box>
						<Text fontSize="xs" color="whiteAlpha.800" fontWeight="light">
							{content}
						</Text>
					</Box>
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
					{/* <ModalOverlay /> */}
					<ModalContent>
						{/* <ModalHeader color={"white"}>{user.fullname}</ModalHeader> */}
						{/* <ModalCloseButton m={2} bg={"#FF605C"} color={"white"} /> */}
						<ModalBody m={0} p={0}>
							{image && <Image src={image} alt={user.fullname} />}
						</ModalBody>
					</ModalContent>
				</Modal>
				<HStack spacing={6}>
					<HStack
						onClick={handleLike}
						cursor="pointer"
						color="whiteAlpha.600"
						mt={2}>
						<AiFillHeart size={20} color={like ? "red" : ""} />
						<Text fontSize="sm" color="whiteAlpha.600">
							{likes?.length}
						</Text>
					</HStack>
					<HStack cursor="pointer" color="whiteAlpha.600" mt={2}>
						<BiCommentDetail size={20} />
						<Text fontSize="sm" color="whiteAlpha.600">
							{replies?.length}
						</Text>
					</HStack>
				</HStack>
			</Box>
		</Flex>
	);
}

export default BaseThread;
