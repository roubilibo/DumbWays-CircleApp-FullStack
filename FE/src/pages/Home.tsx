import { HStack, Stack, Text } from "@chakra-ui/react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useState } from "react";
import { ThreadApi } from "@/Types/ThreadAPI";
import BaseThread from "@/Features/Threads/components/Thread";
import { useGetThread } from "@/Features/Threads/Hooks/useGetThread";
import ThreadForm from "@/Features/Threads/components/ThreadForm";

function Home() {
	const { getThread, isLoading } = useGetThread();

	const [detail, setDetail] = useState(false);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			{detail === false && (
				<>
					<Text color="white" fontSize="lg">
						Home
					</Text>
					<ThreadForm />
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
				</>
			)}

			{detail && (
				<HStack color="white" onClick={() => setDetail(false)} cursor="pointer">
					<BsArrowLeftShort size={24} />
					<Text>Status</Text>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Necessitatibus tempore rerum quae repellat hic explicabo architecto
					eos nemo quod suscipit.
				</HStack>
			)}
		</>
	);
}

export default Home;
