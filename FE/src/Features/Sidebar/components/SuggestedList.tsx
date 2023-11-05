/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Card, Stack, Text } from "@chakra-ui/react";
import SuggestedDetail from "./SuggestedBase";
import { useUsers } from "../Hooks/useUsers";
import { useSelector } from "react-redux";
import { RootState } from "@/store/type/RootState";

function Suggested() {
	const { userLists, isLoading } = useUsers();

	const signInUser = useSelector((state: RootState) => state?.auth);

	const List = userLists?.filter((user: any) => user.id !== signInUser?.id);

	if (isLoading) return <div>Loading...</div>;
	return (
		<Card bg="whiteAlpha.200" p={4}>
			<Text color="white">Suggested for you</Text>
			<Box mt={3}>
				<Stack overflowY="auto">
					{List.map((user: any) => (
						<SuggestedDetail
							key={user.id}
							user_id={user.id}
							username={user.username}
							fullname={user.fullname}
							profile_picture={user.profile_picture}
						/>
					))}
				</Stack>
			</Box>
		</Card>
	);
}

export default Suggested;
