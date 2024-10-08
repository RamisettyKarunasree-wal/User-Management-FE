import { Button, Center, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AUTH_PROVIDERS, ROUTES } from '../../../utils/constants'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function AuthFailed() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [authorizeError, setAuthorizeError] = useState(null)

  useEffect(() => {
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('errorDescription')
    if (error || errorDescription) {
      setAuthorizeError(errorDescription || error)
    }
  }, [searchParams])

  return (
    <Center flexDirection={'column'} h="100%" w="100%" p="1rem">
      {searchParams.get('provider') === AUTH_PROVIDERS.GOOGLE && <FcGoogle size={50}/> }
      {searchParams.get('provider') === AUTH_PROVIDERS.GITHUB && <FaGithub size={50}/> }
      <br />
      <Text fontSize={'md'} textAlign={'center'}>
        {authorizeError}
      </Text>
      <Text fontSize={'md'} textAlign={'center'}>
        Please try-again and give proper authorization to proceed.
      </Text>
      <Flex gap={'1rem'} mt={5} alignItems={'center'}>
        <Button
          size="sm"
          colorScheme="teal"
          variant={'ghost'}
          onClick={() => {
            navigate(ROUTES.SIGN_IN.link)
          }}
        >
          {ROUTES.SIGN_IN.label}
        </Button>
        <Text>or</Text>
        <Button
          size="sm"
          variant={'ghost'}
          colorScheme="teal"
          onClick={() => {
            navigate(ROUTES.SIGN_UP.link)
          }}
        >
          {ROUTES.SIGN_UP.label}
        </Button>
      </Flex>
    </Center>
  )
}
