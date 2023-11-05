/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react";
import { useUsers } from "../Sidebar/Hooks/useUsers";
import {
	Avatar,
	Box,
	Divider,
	Flex,
	Heading,
	Input,
	Text,
	InputGroup,
	InputRightAddon,
	Stack,
} from "@chakra-ui/react";
// import SuggestedDetail from "../Sidebar/components/SuggestedBase";

type SearchUserProps = {
	id: number;
	username: string;
	fullname: string;
	profile_picture: string;
};
export default function SearchUser() {
	const { userLists, isLoading } = useUsers();

	const [filtered, setFiltered] = useState<string>("");

	if (isLoading) return <div>Loading...</div>;

	const results =
		filtered.length > 0
			? userLists?.filter((user: SearchUserProps) =>
					`${user.username} ${user.fullname}`
						.toLowerCase()
						.includes(filtered.toLowerCase())
			  )
			: userLists;

	return (
		<Box color="gray.100">
			<Stack>
				<InputGroup size="sm">
					<Input
						rounded="full"
						placeholder="Search user..."
						value={filtered}
						onChange={(e) => {
							setFiltered(e.target.value);
						}}
					/>
					<InputRightAddon
						children="Username or Fullname"
						bgColor="transparent"
						rounded="full"
					/>
				</InputGroup>
			</Stack>

			<Box maxW="lg" mx="auto" py="2rem">
				{results ? (
					results.map((user: SearchUserProps) => (
						// <SuggestedDetail
						// 	key={user.id}
						// 	user_id={user.id}
						// 	username={user.username}
						// 	fullname={user.fullname}
						// 	profile_picture={user.profile_picture}
						// />
						<Box key={user.id}>
							<Flex gap="4" py="1rem">
								<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
									<Avatar
										name={user.fullname}
										src={user.profile_picture}
										size="sm"
									/>
									<Box>
										<Heading size="sm">{user.fullname}</Heading>
										<Text fontSize="xs" color="whiteAlpha.600">
											@{user.username}
										</Text>
									</Box>
								</Flex>
							</Flex>
							<Divider colorScheme="green" />
						</Box>
					))
				) : (
					<Box
						display="flex"
						minH="sm"
						alignItems="center"
						justifyContent="center">
						<Text textAlign="center">Start searching a user 😉</Text>
					</Box>
				)}
				{results?.length === 0 && (
					<Box
						display="flex"
						minH="sm"
						alignItems="center"
						justifyContent="center">
						<Text textAlign="center">User Not Found 😭</Text>
					</Box>
				)}
			</Box>
		</Box>
	);
}
