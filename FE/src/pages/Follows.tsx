import FollowTabs from "@/Features/Follow/components/FollowTabs";
import { Heading } from "@chakra-ui/react";

export default function Follows() {
	return (
		<>
			<Heading color={"gray.100"} size="xl" pb={8}>
				Follows
			</Heading>
			<FollowTabs />
		</>
	);
}
