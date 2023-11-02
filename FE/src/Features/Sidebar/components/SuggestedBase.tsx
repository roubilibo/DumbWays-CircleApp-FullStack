import { Avatar, Button, HStack, Stack, Text } from "@chakra-ui/react"
import { useState } from 'react'

interface IProps {
    name?: string
    username?: string
    status?: string
}
function SuggestedDetail(props: IProps) {
    const { name, status, username } = props

    const [follow, setFollow] = useState(false)
    function handleFollow() {
        setFollow(!follow)
    }
    return (
        <HStack justify='space-between' >
            <HStack spacing={3}>
                <Avatar size='sm' />
                <Stack spacing={-4}>
                    <Text fontSize='xs' color='white'>{name}</Text>
                    <Text color='whiteAlpha.600' fontSize='xs'>{username}</Text>
                </Stack>
            </HStack>
            <Button _hover={{ bg: 'whatsapp' }} onClick={handleFollow} variant='outline' rounded='full' color={follow ? "white" : 'whiteAlpha.700'} size='sm'>{follow ? status : 'Following'}</Button>
        </HStack>
    )
}

export default SuggestedDetail