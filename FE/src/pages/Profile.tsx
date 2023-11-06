import ProfileTabs from "@/Features/Profile/components/ProfileTabs";
import { Box, Heading } from "@chakra-ui/react";

export default function Profile() {
	return (
		<Box>
			<Heading color={"white"} size="xl" pb={8}>
				My Profile
			</Heading>
			<ProfileTabs />
		</Box>
	);
}
