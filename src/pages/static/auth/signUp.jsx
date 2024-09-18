import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AuthForm, Logo } from '../../../assets'
import { AuthBanner } from '../../../components'
import { API_PATHS, AUTH_PROVIDERS, ROUTES } from '../../../utils/constants'
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from '@chakra-ui/react'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import useAxios from '../../../utils/axiosSetup'
import { useState } from 'react'
import { setUser } from '../../../store/settings'
import { useDispatch } from 'react-redux'

export function AppSignUp() {
  const user = JSON.parse(localStorage.getItem('user'))
  const currentTime = new Date().getTime()

  if (user && currentTime < user.expires_at && user.isAuthorized) {
    return <Navigate to={ROUTES.PROFILE.link} />
  } else {
    return (
      <AuthBanner
        authType={ROUTES.SIGN_UP.label}
        authProvider={<SignUpForm />}
        bannerImage={AuthForm}
      />
    )
  }
}

function SignUpForm() {
  const api = useAxios()
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const signUpHandler = async (e) => {
    e.preventDefault()
    const data = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    }
    try {
      setLoading(true)
      const res = await api.post(API_PATHS.SIGN_UP, data, {
        params: { provider: AUTH_PROVIDERS.JWT },
      })
      const userData = setUser(res.data)
      dispatch(userData)
      setLoading(false)
      nav(ROUTES.PROFILE.link)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Flex
      className="login-form-group"
      flexDirection="column"
      borderRadius={8}
      h={'100%'}
      w={'95%'}
    >
      <Flex display={'flex'} alignItems={'center'} flexDirection={'column'}>
        <Image
          className="icon"
          src={Logo}
          alt={import.meta.env.VITE_APP_TITLE}
          boxSize="3rem"
        />
        <Heading as={'h6'} size={'lg'} textAlign={'center'} mb={6}>
          {ROUTES.SIGN_UP.label}
        </Heading>
      </Flex>

      <form onSubmit={signUpHandler}>
        <FormControl className="login-form-controller">
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box>
              <FormLabel fontSize={'sm'}>First Name</FormLabel>
              <Input
                type="string"
                placeholder="John"
                mb={6}
                id="firstName"
                name="firstName"
                autoComplete="on"
              />
            </Box>
            <Box>
              <FormLabel fontSize={'sm'}>Last Name</FormLabel>
              <Input
                type="string"
                placeholder="Smith"
                mb={6}
                id="lastName"
                name="lastName"
                autoComplete="on"
              />
            </Box>
          </Box>
          <FormLabel fontSize={'sm'}>Email address</FormLabel>
          <Input
            type="email"
            placeholder="john@gmail.com"
            mb={6}
            id="email"
            name="email"
            autoComplete="on"
          />

          <FormLabel fontSize={'sm'}>Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            mb={6}
            name="password"
            autoComplete="on"
          />
          <Button
            colorScheme="teal"
            variant="solid"
            w="100%"
            type="submit"
            isLoading={loading}
          >
            {ROUTES.SIGN_UP.label}
          </Button>
          <Box position="relative" padding="5">
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              or
            </AbsoluteCenter>
          </Box>
          <Button
            leftIcon={<BsGoogle />}
            colorScheme="cyan"
            variant="solid"
            w="100%"
            mb={2}
          >
            {ROUTES.SIGN_UP.label} with Google
          </Button>
          <Button
            leftIcon={<BsGithub />}
            colorScheme="blackAlpha"
            variant="solid"
            w="100%"
            mb={2}
          >
            {ROUTES.SIGN_UP.label} with Github
          </Button>
          <Text fontSize={'sm'} textAlign={'right'}>
            Already have an account{' '}
            <Link to={ROUTES.SIGN_IN.link}>
              <Text as={'b'} color={'blue'}>
                {ROUTES.SIGN_IN.label}
              </Text>
            </Link>
          </Text>
        </FormControl>
      </form>
    </Flex>
  )
}
