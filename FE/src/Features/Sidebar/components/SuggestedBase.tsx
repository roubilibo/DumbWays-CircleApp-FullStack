/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetFollow } from "@/Features/Follow/Hooks/useGetFollow";
import { API } from "@/libs/API";
import { Avatar, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function SuggestedDetail({ user_id, username, fullname }: any) {
	const [follwoId, setFollwoId] = useState({
		user: user_id,
	});

	const { userFollowData, isLoading } = useGetFollow();

	const queryClient = useQueryClient();

	const { mutate: handleFollow } = useMutation({
		mutationFn: () => {
			return API.post(`follow`, follwoId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({ queryKey: ["following"] });
			queryClient.invalidateQueries({ queryKey: ["user-profile"] });
		},
		onError: (error) => {
			console.log(error);
		},
	});

	function handleClick() {
		setFollwoId({ user: user_id });
		handleFollow();
	}

	if (isLoading) return <div>Loading...</div>;

	const { following } = userFollowData;
	console.log(following);

	const isFollowing = following.some((follow: any) => follow.id === user_id);

	// function handleFollow() {
	// 	setFollow(!follow);
	// }
	return (
		<HStack justify="space-between">
			<HStack spacing={3}>
				<Avatar size="sm" />
				<Stack spacing={-4}>
					<Text fontSize="xs" color="white">
						{fullname}
					</Text>
					<Text color="whiteAlpha.600" fontSize="xs">
						@{username}
					</Text>
				</Stack>
			</HStack>
			<Button
				_hover={{ bg: "whatsapp" }}
				onClick={handleClick}
				variant="outline"
				rounded="full"
				color={isFollowing ? "white" : "whiteAlpha.700"}
				size="sm">
				{isFollowing ? "Following" : "Follow"}
			</Button>
		</HStack>
	);
}

export default SuggestedDetail;
