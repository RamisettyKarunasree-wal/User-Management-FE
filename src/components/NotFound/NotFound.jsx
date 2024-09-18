import { useNavigate } from 'react-router-dom'
import { Button, Center, Text } from '@chakra-ui/react'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Center flexDirection={'column'} h="100%" w="100%" p="1rem">
      <Text fontSize={'md'} textAlign={'center'}>
        The page you are looking does not exist or has been moved.
      </Text>
      <Button
        m="1rem"
        size="sm"
        colorScheme="teal"
        onClick={() => {
          navigate('/')
        }}
      >
        Go Home
      </Button>
    </Center>
  )
}
