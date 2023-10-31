import {
	Box,
	Flex,
	FormControl,
	Input,
	Text,
	Button,
	// useColorModeValue,
	Center,
} from "@chakra-ui/react";
import { useLogin } from "../Hooks/useLogin";
import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

export default function LoginForm() {
	const { handleChange, handleLogin } = useLogin();
	const passwordInputRef = useRef<HTMLInputElement>(null);
	// const navigate = useNavigate();
	// const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				handleLogin();
			}
		};

		passwordInputRef.current?.addEventListener("keypress", handleKeyPress);

		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			passwordInputRef.current?.removeEventListener("keypress", handleKeyPress);
		};
	}, [handleLogin]);
	// const handleTogglePasswordVisibility = () => {
	// 	setShowPassword(!showPassword);
	// };

	return (
		<Center >
			<Flex
				direction="column"
				// bg={useColorModeValue("#222", " white")}
				// color={useColorModeValue("white", "#222")}
				padding={5}
				// borderRadius={10}
				// border="1px solid white"
			>
				<Text
					color={"green"}
					fontSize="2xl"
					fontWeight="bold"
					// textAlign={"center"}
					m={0}
					mb={0}>
					Circle
				</Text>
				<Text fontSize={"md"} fontWeight={"bold"} mb={2}>
					Login to Circle
				</Text>
				<FormControl
					isRequired
					display="flex"
					flexDirection="column"
					gap={3}
					width="350px"
					bg="transparent"
					color="grey">
					<Input
						placeholder="Email"
						name="email"
						color={"white"}
						onChange={handleChange}
					/>
					<Input
						ref={passwordInputRef}
						type="password"
						placeholder="Password"
						name="password"
						color={"white"}
						onChange={handleChange}
					/>
					<Button
						backgroundColor="green"
						colorScheme="green"
						color="white"
						onClick={handleLogin}
						mt={5}
						rounded={"full"}>
						Login
					</Button>
				</FormControl>
				<Box display="flex" justifyContent="flex-end">
					<Text>Forgot password?</Text>
				</Box>
				{/* <Box>
					<Text>Don't have an account yet?</Text>
					<Text
						color={"green"}
						cursor={"pointer"}
						onClick={() => navigate("/auth/register")}>
						Create account
					</Text>
				</Box> */}
			</Flex>
		</Center>
	);
}
