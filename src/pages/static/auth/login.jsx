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
import { AuthForm, Logo } from '../../../assets'
import { AuthBanner } from '../../../components'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import './auth.scss'
import { API_PATHS, AUTH_PROVIDERS, ROUTES } from '../../../utils/constants'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useAxios from '../../../utils/axiosSetup'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../store/settings'
import toast from 'react-hot-toast'

export function AppLogin() {
  const user = JSON.parse(localStorage.getItem('user'))
  const currentTime = new Date().getTime()

  if (user && currentTime < user.expires_at && user.isAuthorized) {
    return <Navigate to={ROUTES.PROFILE.link} />
  } else {
    return (
      <AuthBanner
        authType={ROUTES.SIGN_IN.label}
        authProvider={<LoginForm />}
        bannerImage={AuthForm}
      />
    )
  }
}

function LoginForm() {
  const api = useAxios()
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const loginWithCredentials = async (e) => {
    e.preventDefault()
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    }
    try {
      setLoading(true)
      const res = await api.post(API_PATHS.SIGN_IN, data, {
        params: { provider: AUTH_PROVIDERS.JWT },
      })
      const userData = setUser(res.data)
      dispatch(userData)
      setLoading(false)
      nav(ROUTES.PROFILE.link)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_APP_BASE_URL}${API_PATHS.GOOGLE_SIGN_IN}`
  }

  const loginWithGithub = () => {
    window.location.href = `${import.meta.env.VITE_APP_BASE_URL}${API_PATHS.GITHUB_SIGN_IN}`
  }

  return (
    <Flex
      className="login-form-group"
      flexDirection="column"
      borderRadius={8}
      h={'100%'}
      w={'95%'}
    >
      <Flex
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <Image
          className="icon"
          src={Logo}
          alt={import.meta.env.VITE_APP_TITLE}
          boxSize="3rem"
        />
        <Heading as={'h6'} size={'lg'} textAlign={'center'} mb={6}>
          {ROUTES.SIGN_IN.label}
        </Heading>
      </Flex>
      <form onSubmit={loginWithCredentials}>
        <FormControl className="login-form-controller">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="john@gmail.com"
            mb={6}
            id="email"
            name="email"
          />
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            mb={6}
            id="password"
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
            {ROUTES.SIGN_IN.label}
          </Button>
          <Box position="relative" padding="10">
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
            mb={5}
            onClick={loginWithGoogle}
          >
            {ROUTES.SIGN_IN.label} with Google
          </Button>
          <Button
            leftIcon={<BsGithub />}
            colorScheme="blackAlpha"
            variant="solid"
            w="100%"
            mb={5}
            onClick={loginWithGithub}
          >
            {ROUTES.SIGN_IN.label} with Github
          </Button>
          <Text fontSize={'sm'} textAlign={'right'}>
            Create an account{' '}
            <Link to={ROUTES.SIGN_UP.link}>
              <Text as={'b'} color={'blue'}>
                {ROUTES.SIGN_UP.label}
              </Text>
            </Link>
          </Text>
        </FormControl>
      </form>
    </Flex>
  )
}
