import Profile from "@/Features/Sidebar/components/Profile";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Suggested from "@/components/SuggestedList";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function AppLayout() {
	return (
		<Grid gridTemplateColumns="0.8fr 1.5fr 1.1fr" h="100vh" w={"100vw"}>
			<GridItem px={6} py={4} borderRight="1px solid gray">
				<Navbar />
			</GridItem>

			<GridItem borderRight="1px solid gray" px={6} py={6} overflowY="auto">
				<Outlet />
			</GridItem>

			<GridItem px={6} py={4}>
				<Profile />
				<Box mt={4}>
					<Suggested />

					<Footer />
				</Box>
			</GridItem>
		</Grid>
	);
}

export default AppLayout;
