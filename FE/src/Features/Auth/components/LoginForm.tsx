import {
	Box,
	Flex,
	FormControl,
	Input,
	Text,
	Button,
	useColorModeValue,
	Center,
} from "@chakra-ui/react";
import { useLogin } from "../Hooks/useLogin";
import { useEffect, useRef } from "react";

export default function LoginForm() {
	const { handleChange, handleLogin } = useLogin();
	const passwordInputRef = useRef<HTMLInputElement>(null);

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

	return (
		<Center bg={"black"} w={"100vw"} h="100vh">
			<Flex
				direction="column"
				bg={useColorModeValue("black", "white")}
				color={useColorModeValue("white", "black")}
				padding={5}
				borderRadius={10}
				border="1px solid white">
				<Text
					color={"green"}
					fontSize="2xl"
					fontWeight="bold"
					textAlign={"center"}
					m={2}
					mb={7}>
					Login Circle
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
						mt={5}>
						Login
					</Button>
				</FormControl>
				<Box display="flex" justifyContent="flex-end">
					<Text>Forgot password?</Text>
				</Box>
			</Flex>
		</Center>
	);
}
