import {
	Avatar,
	Box,
	Button,
	FormControl,
	Grid,
	GridItem,
	HStack,
	Input,
	Stack,
	Text,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Suggested from "../components/SuggestedList";
import Profile from "../Features/Sidebar/components/Profile";
import { BsArrowLeftShort } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { useState } from "react";
import { ThreadApi } from "@/Types/ThreadAPI";
import BaseThread from "@/Features/Threads/components/Thread";
import Footer from "@/components/Footer";
import { useGetThread } from "@/Features/Threads/Hooks/useGetThread";
import { usePostThread } from "@/Features/Threads/Hooks/usePostThread";

function Home() {
	const { getThread, isLoading } = useGetThread();
	const {
		handleButtonClick,
		handleChange,
		handlePost,
		isPending,
		setImage,
		fileInputRef,
	} = usePostThread();

	const [detail, setDetail] = useState(false);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Grid gridTemplateColumns="0.8fr 1.5fr 1.1fr" h="100vh" w={"100vw"}>
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
										<BiImageAdd
											size={25}
											color="green"
											onClick={handleButtonClick}
										/>
										<Input
											type="file"
											name="image"
											onChange={(e) => {
												if (e.target?.files) {
													setImage(e.target?.files[0]);
												} else {
													setImage(null);
												}
											}}
											style={{ display: "none" }}
											ref={fileInputRef}
										/>
									</Box>
									<Button
										colorScheme="whatsapp"
										size="xs"
										px={3}
										rounded="full"
										onClick={() => handlePost()}
										isLoading={isPending}>
										Post
									</Button>
								</HStack>
							</HStack>
						</FormControl>
					</form>
					<Stack mt={6}>
						{getThread &&
							getThread?.map((e: ThreadApi) => (
								<BaseThread
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
				</GridItem>
			)}

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

export default Home;
