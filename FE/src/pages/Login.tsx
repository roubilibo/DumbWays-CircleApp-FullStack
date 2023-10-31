import LoginForm from "@/Features/Auth/components/LoginForm";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();
	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			// marginTop={"50px"}
			justifyContent={"center"}
			color={"white"}
			w={"100vw"}
			h="100vh">
			<LoginForm />
			<Box display={"flex"} gap={2}>
				<Text>Don't have an account yet?</Text>
				<Text
					color={"green"}
					cursor={"pointer"}
					onClick={() => navigate("/auth/register")}>
					Create account
				</Text>
			</Box>
		</Box>
	);
}
