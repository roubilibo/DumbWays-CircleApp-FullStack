import {
	Avatar,
	Box,
	Button,
	Card,
	Flex,
	Grid,
	GridItem,
	HStack,
	Image,
	Input,
	Stack,
	Text,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Suggested from "../../components/SuggestedList";
import Profile from "../../components/Profile";
import Thread from "../../components/Thread";
import ThreadDetail from "../../components/ThreadBase";
import { BsDot, BsFacebook, BsArrowLeftShort } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { AiFillLinkedin, AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { useState } from "react";
// import data from '../../mocks/thread.json'
import { useEffect } from "react";
import { API } from "@/libs/API";
import ThreadAPI from "@/components/Types/ThreadAPI";
import { ChangeEvent } from "react";

type formInputData = {
	content: string;
	image: string;
	user: number;
};

function Home() {
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
		// refetch()
	}

	return (
		<Grid gridTemplateColumns="270px 1.5fr 1.1fr" bg="blackAlpha.800" h="100vh">
			<GridItem px={6} py={4} borderRight="1px solid gray">
				<Navbar />
			</GridItem>

			{detail === false && (
				<GridItem overflowY="auto" px={6} py={4} borderRight="1px solid gray">
					<Text color="white" fontSize="lg">
						Home
					</Text>
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
							<Input
								name="image"
								placeholder="Image URL"
								onChange={handleChange}
							/>
							<Input
								name="user"
								placeholder="User ID"
								onChange={handleChange}
							/>
						</HStack>
						<HStack>
							<Box cursor="pointer">
								<BiImageAdd size={25} color="green" />
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

					<Stack mt={6}>
						{data &&
							data.map((e: ThreadAPI) => (
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
