import RegisterForm from "@/Features/Auth/components/RegisterForm";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const navigate = useNavigate();
	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			// marginTop={"50px"}
			justifyContent={"center"}
			color={"white"}
			// bg={"white"}
			w={"100vw"}
			h={"100vh"}>
			<RegisterForm />
			<Box display={"flex"} gap={2}>
				<Text>Already have account?</Text>
				<Text
					color={"green"}
					cursor={"pointer"}
					onClick={() => navigate("/auth/login")}>
					Login
				</Text>
			</Box>
		</Box>
	);
}
