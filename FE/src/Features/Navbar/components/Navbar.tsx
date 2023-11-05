import { Box, Button, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineHeart, AiOutlineHome } from "react-icons/ai";
import { TbUserSearch } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import { useLogout } from "@/Features/Auth/Hooks/useLogout";
import { Link } from "react-router-dom";
// import LoginForm from "../../Features/Auth/components/LoginForm";

function Navbar() {
	const { loading, handleLogout } = useLogout();

	return (
		<Stack h="full" justify="space-between">
			<Box>
				<Link to="/">
					<Heading color="green">circle</Heading>
				</Link>
				<Stack mt={8} spacing={6}>
					<Link to="/">
						<HStack cursor="pointer" color="white">
							<AiOutlineHome size={25} />
							<Text fontSize="sm  ">Home</Text>
						</HStack>
					</Link>
					<Link to="/search">
						<HStack cursor="pointer" color="white">
							<TbUserSearch size={25} />
							<Text fontSize="sm  ">Search</Text>
						</HStack>
					</Link>
					<Link to="/follows">
						<HStack cursor="pointer" color="white">
							<AiOutlineHeart color="transparant" size={25} />
							<Text fontSize="sm  ">Follows</Text>
						</HStack>
					</Link>
					<Link to="/profile">
						<HStack cursor="pointer" color="white">
							<AiOutlineUser size={25} />
							<Text fontSize="sm  ">Profile</Text>
						</HStack>
					</Link>
					<Button
						onClick={() => document.getElementById("form-content")?.focus()}
						size="sm"
						rounded="full"
						colorScheme="whatsapp">
						Create Post
					</Button>
				</Stack>
			</Box>
			{/* <LoginForm /> */}
			<Button
				fontWeight="light"
				color="white"
				display="flex"
				justifyContent="start"
				leftIcon={<BiLogOut size={30} />}
				colorScheme="teal"
				variant="unstyled"
				onClick={handleLogout}
				disabled={loading}>
				{loading ? "Loading..." : "Logout"}
				{/* Logout */}
			</Button>
		</Stack>
	);
}

export default Navbar;
