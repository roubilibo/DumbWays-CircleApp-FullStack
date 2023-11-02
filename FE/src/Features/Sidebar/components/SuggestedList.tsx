import { Box, Card, Stack, Text } from "@chakra-ui/react";
import SuggestedDetail from "./SuggestedBase";

function Suggested() {
	return (
		<Card bg="whiteAlpha.200" p={4}>
			<Text color="white">Suggested for you</Text>
			<Box mt={3}>
				<Stack>
					<SuggestedDetail name="xxxxxx" status="Follow" username="@jxxxxxxx" />
					<SuggestedDetail name="xxxxxx" status="Follow" username="@jxxxxxxx" />
				</Stack>
			</Box>
		</Card>
	);
}

export default Suggested;
