/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Avatar,
	Box,
	Card,
	CardBody,
	CardHeader,
	Flex,
	Heading,
	Stack,
	StackDivider,
	Text,
} from "@chakra-ui/react";
import { useGetFollow } from "../Hooks/useGetFollow";

export default function Following() {
	const { userFollowData, isLoading } = useGetFollow();

	if (isLoading) return <div>Loading...</div>;
	const { following } = userFollowData;

	return (
		<Box>
			<Card border={"solid 1px white"} bg={"transparent"} color={"white"}>
				<CardHeader>
					<Heading size="md">
						Users that you follow: {following?.length}
					</Heading>
				</CardHeader>
				<CardBody>
					<Stack divider={<StackDivider />} spacing="4">
						{following?.map((follower: any) => (
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
