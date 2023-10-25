import { Avatar, Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { useState } from "react";
import ThreadAPI from "../Types/ThreadAPI";

// interface IProps {
//     image?: string;
//     name?: string;
//     username?: string;
//     content?: string;
//     likes?: number;
//     comment?: number;
//     time?: string;
//     onClick?: () => void
// }
function ThreadDetail(props: ThreadAPI) {
    const { content, image, user, replies, likes } = props;

    const [like, setLike] = useState(false);

    function handleLike() {
        setLike(!like);
    }

    return (
        <Flex gap={3} borderBottom='1px solid gray' >
            <Avatar size="sm" name="Dan Abrahmov" src={user.profile_picture} />
            <Box mb={4}>
                <HStack>
                    <Text
                        display="flex"
                        gap={1}
                        fontSize="sm"
                        fontWeight="semibold"
                        color="whiteAlpha.800"
                        // onClick={onClick}
                        cursor='pointer'
                    >
                        {user.full_name}
                        <Text fontWeight="light" display="flex" color="whiteAlpha.600">
                            {user.username} <BsDot color="gray" size={24} />
                            {/* {time} */}
                        </Text>
                    </Text>
                </HStack>
                <Text fontSize="xs" color="whiteAlpha.800" fontWeight='light'>
                    {content}
                </Text>
                {image && <Image src={image} />}
                <HStack spacing={6}>
                    <HStack
                        onClick={handleLike}
                        cursor="pointer"
                        color="whiteAlpha.600"
                        mt={2}
                    >
                        <AiFillHeart size={20} color={like ? "red" : ""} />
                        <Text fontSize="sm" color="whiteAlpha.600">
                            {likes.length}
                        </Text>
                    </HStack>
                    <HStack cursor="pointer" color="whiteAlpha.600" mt={2}>
                        <BiCommentDetail size={20} />
                        <Text fontSize="sm" color="whiteAlpha.600">
                            {replies.length}
                        </Text>
                    </HStack>
                </HStack>
            </Box>
        </Flex>
    );
}

export default ThreadDetail;