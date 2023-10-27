import { useState } from "react";
import {
	Button,
	FormControl,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";

function LoginForm() {
	const [isOpen, setIsOpen] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		// Lakukan proses login di sini
		console.log("Email:", email);
		console.log("Password:", password);
		handleClose();
	};

	return (
		<>
			<Button
				size="sm"
				rounded="full"
				colorScheme="whatsapp"
				onClick={handleOpen}>
				Login
			</Button>

			<Modal isOpen={isOpen} onClose={handleClose}>
				<ModalOverlay />
				<ModalContent bg="#333333">
					<ModalHeader mt={2} color={"white"}>
						Login
					</ModalHeader>
					<ModalCloseButton m={2} bg={"#FF605C"} color={"white"} />

					<ModalBody mb={2}>
						<FormControl onSubmit={handleSubmit}>
							<Text color={"white"} mb={2}>
								Email:
							</Text>
							<Input
								type="email"
								value={email}
								color={"white"}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<Text color={"white"} mb={2} mt={4}>
								Password:
							</Text>
							<Input
								type="password"
								value={password}
								color={"white"}
								onChange={(e) => setPassword(e.target.value)}
							/>

							<Button
								rounded="full"
								colorScheme="whatsapp"
								type="submit"
								mt={4}
								size={"sm"}
								textAlign={"center"}>
								Login
							</Button>
						</FormControl>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default LoginForm;
