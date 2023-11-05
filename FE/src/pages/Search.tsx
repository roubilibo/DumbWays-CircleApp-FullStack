import SearchUser from "@/Features/Search/SearchUser";
import { Box, Heading } from "@chakra-ui/react";

export default function Search() {
	return (
		<Box>
			<Heading color={"white"} size="xl" pb={8}>
				Search
			</Heading>
			<SearchUser />
		</Box>
	);
}
