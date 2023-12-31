import { RootState } from "@/store/type/RootState";
import {
	Avatar,
	Box,
	Button,
	Card,
	Flex,
	HStack,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useUserProfile } from "../Hooks/useUserProfile";

//
{
	/* */
}

function Profile() {
	const user = useSelector((state: RootState) => state?.auth);
	const { profileData, isLoading } = useUserProfile();

	if (isLoading) return <div>Loading...</div>;

	const { followers, following } = profileData;
	return (
		<Card bg="whiteAlpha.200" p={4}>
			<Text color="white">My Profile</Text>
			<Box
				pos="relative"
				h="70px"
				mt={3}
				rounded="xl"
				//bg="linear-gradient(to top, #96fbc4 0%, #f9f586 100%)" //linear-gradient(to top, #96fbc4 0%, #f9f586 100%)
				bgImage={
					"https://res.cloudinary.com/dtha7yn1x/image/upload/v1698820513/Threads/mrhp1gthjea5ijuvpxt8.jpg"
				}>
				<Box
					pos="absolute"
					bottom={-6}
					left={4}
					p={1}
					bg="blackAlpha.800"
					rounded="full">
					<Avatar size="md" name={user?.fullname} src={user?.profile_picture} />
				</Box>
			</Box>
			<Flex justify="right" mt={-6}>
				<Button
					color="white"
					size="xs"
					rounded="full"
					variant="outline"
					mt={8}
					w="fit-content"
					_hover={{ bg: "gray" }}>
					Edit Profile
				</Button>
			</Flex>

			<Stack spacing={0}>
				<Text mt={3} fontSize="lg" fontWeight="semibold" color="white">
					{user?.fullname}
				</Text>
				<Text fontSize="xs" color="whiteAlpha.600">
					@{user?.username}
				</Text>
				<Text fontSize="sm" color="whiteAlpha.800">
					{user?.bio}
				</Text>
				<HStack fontSize="sm">
					<HStack>
						<Text color="whiteAlpha.800">{following?.length}</Text>
						<Text color="whiteAlpha.600">Following</Text>
					</HStack>
					<HStack>
						<Text color="whiteAlpha.800">{followers?.length}</Text>
						<Text color="whiteAlpha.600">Followers</Text>
					</HStack>
				</HStack>
			</Stack>
		</Card>
	);
}

export default Profile;
