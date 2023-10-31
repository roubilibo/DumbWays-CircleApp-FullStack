import { FormControl, Input, Text, Button } from "@chakra-ui/react";
import { UseRegister } from "../Hooks/useRegister";

export default function RegisterForm() {
	const { handleChange, handleRegister } = UseRegister();

	const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleRegister();
		}
	};

	return (
		<form onKeyDown={handleKeyDown}>
			<FormControl
				isRequired
				display={"flex"}
				flexDirection={"column"}
				gap={3}
				width={"350px"}
				bg={"transparent"}
				color={"white"}
				// border={"1px solid white"}
				borderRadius={10}
				padding={5}>
				<Text color={"brand.green"} fontSize={"2xl"} fontWeight={"bold"}>
					Connect
				</Text>
				<Text fontSize={"2xl"} fontWeight={"bold"}>
					Create Account Connect
				</Text>
				<Input
					placeholder="Your Name"
					name="fullname"
					onChange={handleChange}
				/>
				<Input placeholder="Username" name="username" onChange={handleChange} />
				<Input placeholder="Email" name="email" onChange={handleChange} />
				<Input
					type="password"
					placeholder="Password"
					name="password"
					onChange={handleChange}
				/>
				<Button
					backgroundColor={"green"}
					colorScheme="green"
					color={"white"}
					onClick={handleRegister}>
					Create
				</Button>
			</FormControl>
		</form>
	);
}
