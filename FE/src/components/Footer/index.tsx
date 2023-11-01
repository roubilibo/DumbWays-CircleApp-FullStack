import { Card, Flex, Image, Text } from "@chakra-ui/react";
// import React from "react";
import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { BsDot, BsFacebook } from "react-icons/bs";

function Footer() {
	return (
		<Card mt={4} bg="whiteAlpha.200" p={3}>
			<Flex>
				<Text display="flex" fontSize="sm" gap={1} color="whiteAlpha.800">
					Developedby <Text color="white">Your Name</Text>
				</Text>
				<Flex gap="3px" color="gray">
					<BsDot size={24} />
					<AiFillGithub size={20} />
					<AiFillLinkedin size={20} />
					<BsFacebook size={20} />
					<AiFillInstagram size={20} />
				</Flex>
			</Flex>
			<Text fontSize="x-small" color="whiteAlpha.600" display="flex" gap={2}>
				Powered by{" "}
				<Image
					w="30px"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&usqp=CAU"
					alt="logo"
				/>{" "}
				Dumbways Indonesia #1Coding Bootcamp
			</Text>
		</Card>
	);
}

export default Footer;
