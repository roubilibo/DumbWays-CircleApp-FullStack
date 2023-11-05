/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Card,
	CardHeader,
	Heading,
	CardBody,
	Stack,
	StackDivider,
	Flex,
	Avatar,
	Text,
	Box,
} from "@chakra-ui/react";
import { useGetFollow } from "../Hooks/useGetFollow";

export default function Followers() {
	const { userFollowData, isLoading } = useGetFollow();

	if (isLoading) return <div>Loading...</div>;

	const { followers } = userFollowData;
	return (
		<Box>
			<Card border={"solid 1px white"} bg={"transparent"} color={"white"}>
				<CardHeader>
					<Heading size="md">
						Users that follow you: {followers?.length}
					</Heading>
				</CardHeader>
				<CardBody>
					<Stack divider={<StackDivider />} spacing="4">
						{followers?.map((follower: any) => (
							<Box key={follower.id}>
								<Flex gap="4">
									<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
										<Avatar
											name={follower.fullname}
											src={follower.profile_picture}
											size="sm"
										/>
										<Box>
											<Heading size="sm">{follower.fullname}</Heading>
										</Box>
									</Flex>
								</Flex>
								<Heading size="xs"></Heading>
								<Text pt="2" fontSize="sm">
									{follower.bio
										? follower.bio
										: "Tidak ada deskripsi profil"}
								</Text>
							</Box>
						))}
					</Stack>
				</CardBody>
			</Card>
		</Box>
	);
}
