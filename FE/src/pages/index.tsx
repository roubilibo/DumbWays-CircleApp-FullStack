import {
	Avatar,
	Box,
	Button,
	Card,
	Flex,
	FormControl,
	Grid,
	GridItem,
	HStack,
	IconButton,
	Image,
	Input,
	Stack,
	Text,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Suggested from "../components/SuggestedList";
import Profile from "../components/Profile";
import Thread from "../components/Thread";
import ThreadDetail from "../components/ThreadBase";
import { BsDot, BsFacebook, BsArrowLeftShort } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { AiFillLinkedin, AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { useRef, useState } from "react";
// import data from '../../mocks/thread.json'
import { useEffect } from "react";
import { API } from "@/libs/API";
import { ThreadApi } from "@/Types/ThreadAPI";
import { ChangeEvent } from "react";
import { useThreads } from "@/Features/Threads/Hooks/useThreads";
// import ThreadForm from "@/Features/Threads/components/ThreadForm";

type formInputData = {
	content: string;
	image?: string;
	user: number;
};

function Home() {
	const { fileInputRef, handleButtonClick } = useThreads();
	const [detail, setDetail] = useState(false);
	const [data, setData] = useState([]);
	const [form, setForm] = useState<formInputData>({
		content: "",
		image: "",
		user: 1,
	});

	useEffect(() => {
		const fetchData = async () => {
			const response = await API.get("/threads");
			setData(response.data.data);
		};
		fetchData();
	}, []);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

	async function handlePost() {
		console.log(form);
		await API.post("/thread", form);
		// refetch();
	}
	// const fileInputRef = useRef<HTMLInputElement>(null);

	// function handleButtonClick() {
	// 	fileInputRef.current?.click();
	// }

	return (
		<Grid
			gridTemplateColumns="0.8fr 1.5fr 1.1fr"
			// templateColumns="repeat(3, 1fr)"
			// bg="blackAlpha.800"
			h="100vh"
			w={"100vw"}>
			<GridItem px={6} py={4} borderRight="1px solid gray">
				<Navbar />
			</GridItem>

			{detail === false && (
				<GridItem overflowY="auto" px={6} py={4} borderRight="1px solid gray">
					<Text color="white" fontSize="lg">
						Home
					</Text>

					{/* <ThreadForm /> */}
					<form encType="multipart/form-data">
						<FormControl>
							<HStack mt={5} justify="space-between">
								<HStack>
									<Avatar size="sm" mr={3} />
									<Input
										variant="unstyled"
										color="whiteAlpha.400"
										placeholder="What is happening?!"
										_focus={{ color: "white" }}
										name="content"
										onChange={handleChange}
									/>
								</HStack>
								<HStack>
									<Box cursor="pointer">
										{/* <BiImageAdd
											size={25}
											color="green"
											name="image"
											// onClick={handleClick}
										/> */}
										<IconButton
											bg={"transparent"}
											outline={"none"}
											aria-label="Add Image"
											// name="image"
											onClick={handleButtonClick}
											icon={<BiImageAdd size={25} color="green" />}
										/>
										<Input
											type="file"
											name="image"
											onChange={handleChange}
											style={{ display: "none" }}
											ref={fileInputRef}
										/>
										{/* <IconButton
											bg={"transparent"}
											outline={"none"}
											aria-label="Add Image"
											name="image"
											icon={<BiImageAdd size={25} color="green" />}
											onClick={handleImageClick}
										/> */}
										{/* <Button
											variant={"ghost"}
											color={"brand.green"}
											onClick={handleButtonClick}>
											<BiImageAdd
												style={{
													height: "50px",
													width: "50px",
												}}
											/>
										</Button> */}
									</Box>
									<Button
										colorScheme="whatsapp"
										size="xs"
										px={3}
										rounded="full"
										onClick={handlePost}>
										Post
									</Button>
								</HStack>
							</HStack>
						</FormControl>
					</form>
					<Stack mt={6}>
						{data &&
							data?.map((e: ThreadApi) => (
								<ThreadDetail
									// key={e.id}
									// onClick={() => setDetail(true)}
									// comment={e.likes}
									// likes={e.likes}
									// name={e.name}
									// time={'4h'}
									// username={e.username}
									// imgProfile="https://bit.ly/dan-abramov"
									// content={e.content}
									// onClick={() => setDetail(true)}
									key={e.id}
									id={e.id}
									content={e.content}
									image={e.image}
									user={e.user}
									replies={e.replies}
									likes={e.likes}
								/>
							))}
					</Stack>
				</GridItem>
			)}

			{detail && (
				<GridItem borderRight="1px solid gray" px={6} py={6}>
					<HStack
						color="white"
						onClick={() => setDetail(false)}
						cursor="pointer">
						<BsArrowLeftShort size={24} />
						<Text>Status</Text>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Necessitatibus tempore rerum quae repellat hic explicabo architecto
						eos nemo quod suscipit.
					</HStack>
					<Box mt={6}>
						<Thread />
					</Box>
				</GridItem>
			)}

			<GridItem px={6} py={4}>
				<Profile />
				<Box mt={4}>
					<Suggested />

					<Card mt={4} bg="whiteAlpha.200" p={3}>
						<Flex>
							<Text display="flex" fontSize="sm" gap={1} color="whiteAlpha.800">
								Developedby <Text color="white">Your Name</Text>
							</Text>
							<Flex gap="3px" color="gray">
								<BsDot size={24} />
								<AiFillGithub size={20} />
								<AiFillLinkedin size={20} />
								<BsFacebook size={20} />
								<AiFillInstagram size={20} />
							</Flex>
						</Flex>
						<Text
							fontSize="x-small"
							color="whiteAlpha.600"
							display="flex"
							gap={2}>
							Powered by{" "}
							<Image
								w="30px"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&usqp=CAU"
								alt="logo"
							/>{" "}
							Dumbways Indonesia #1Coding Bootcamp
						</Text>
					</Card>
				</Box>
			</GridItem>
		</Grid>
	);
}

export default Home;
