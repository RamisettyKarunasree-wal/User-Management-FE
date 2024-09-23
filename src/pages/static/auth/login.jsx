import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { AuthForm, Logo } from '../../../assets'
import { AuthBanner } from '../../../components'
import { BsEyeFill, BsEyeSlash, BsGithub, BsGoogle } from 'react-icons/bs'
import './auth.scss'
import {
  API_PATHS,
  AUTH_PROVIDERS,
  FormSchemas,
  ROUTES,
} from '../../../utils/constants'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useAxios from '../../../utils/axiosSetup'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../store/settings'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { apiErrorHandler } from '../../../utils/utilities'

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
  const [showPassword, setShowPassword] = useState(false)

  const loginWithCredentials = async (data) => {
    try {
      setLoading(true)
      const res = await api.post(API_PATHS.SIGN_IN, data, {
        params: { provider: AUTH_PROVIDERS.CREDENTIAL },
      })
      const userData = setUser(res.data)
      dispatch(userData)
      setLoading(false)
      nav(ROUTES.PROFILE.link)
    } catch (error) {
      setLoading(false)
      apiErrorHandler(error)
    }
  }

  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_APP_BASE_URL}${API_PATHS.GOOGLE_SIGN_IN}`
  }

  const loginWithGithub = () => {
    let query = '';
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.email) {
      query = { provider: AUTH_PROVIDERS.GITHUB, email: user.email } 
      query = `?${new URLSearchParams(query).toString()}`;
    }
    const link = `${import.meta.env.VITE_APP_BASE_URL}${API_PATHS.GITHUB_SIGN_IN}${query}`
    window.location.href = link
  }

  const loginSchema = yup.object().shape({ ...FormSchemas })
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(loginSchema),
  })

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
      <form onSubmit={handleSubmit(loginWithCredentials)}>
        <div className="login-form-controller">
          <FormControl isInvalid={errors.email} mb={5}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="text"
              name="email"
              autoComplete="on"
              placeholder="john@gmail.com"
              {...register('email')}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password} mb={2}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                autoComplete="on"
                placeholder="Password"
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
              />
              <InputRightElement>
                <IconButton
                  variant="link"
                  icon={showPassword ? <BsEyeFill /> : <BsEyeSlash />}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Text fontSize={'xs'} textAlign={'right'} mb={5}>
            <Link to={ROUTES.FORGOT_PASSWORD.link}>
              <Text as={'b'} color={'blue'}>
                Forgot Password?
              </Text>
            </Link>
          </Text>

          <Button
            w="100%"
            type="submit"
            variant="solid"
            colorScheme="teal"
            isLoading={loading}
            isDisabled={!isValid || isSubmitting}
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
        </div>
      </form>
    </Flex>
  )
}
