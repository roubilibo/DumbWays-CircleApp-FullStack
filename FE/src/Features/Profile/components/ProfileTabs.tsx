import Followers from "@/Features/Follow/components/Followers";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import UpdateProfileForm from "./UpdateProfileForm";

export default function ProfileTabs() {
	return (
		<Box>
			<Tabs isFitted variant="enclosed">
				<TabList>
					<Tab color={"white"}>My Profile</Tab>
					<Tab color={"white"}>Password</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<UpdateProfileForm />
					</TabPanel>
					<TabPanel>
						<Followers />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
}
