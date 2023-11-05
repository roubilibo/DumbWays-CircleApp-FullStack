import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Followers from "./Followers";
import Following from "./Following";

export default function FollowTabs() {
	return (
		<Box>
			<Tabs isFitted variant="enclosed">
				<TabList>
					<Tab color={"white"}>Following</Tab>
					<Tab color={"white"}>Follower</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<Following />
					</TabPanel>
					<TabPanel>
						<Followers />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
}
