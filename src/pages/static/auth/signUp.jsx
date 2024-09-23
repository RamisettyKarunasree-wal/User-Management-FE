import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AuthForm, Logo } from '../../../assets'
import { AuthBanner } from '../../../components'
import {
  API_PATHS,
  AUTH_PROVIDERS,
  FormSchemas,
  ROUTES,
} from '../../../utils/constants'
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
import { BsEyeFill, BsEyeSlash, BsGithub, BsGoogle } from 'react-icons/bs'
import useAxios from '../../../utils/axiosSetup'
import { useState } from 'react'
import { setUser } from '../../../store/settings'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { apiErrorHandler } from '../../../utils/utilities'

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
  const [showPassword, setShowPassword] = useState(false)

  const LABEL_SIZE = 'xs'

  const registerWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_APP_BASE_URL}${API_PATHS.GOOGLE_SIGN_UP}`
  }

  const registerWithGithub = () => {
    toast.error('Github integration will come in future.')
  }

  const signUpHandler = async (data) => {
    try {
      setLoading(true)
      const res = await api.post(API_PATHS.SIGN_UP, data, {
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

  const signUpSchema = yup.object().shape({
    ...FormSchemas,
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(signUpSchema),
  })

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

      <form onSubmit={handleSubmit(signUpHandler)}>
        <div className="login-form-controller">
          <FormControl>
            <Box display={'flex'} justifyContent={'space-between'} gap={5}>
              <FormControl isInvalid={errors.firstName} mb={5}>
                <FormLabel fontSize={LABEL_SIZE}>First Name</FormLabel>
                <Input
                  type="string"
                  name="firstName"
                  autoComplete="on"
                  placeholder="John"
                  {...register('firstName')}
                />
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.lastName} mb={5}>
                <FormLabel fontSize={LABEL_SIZE}>Last Name</FormLabel>
                <Input
                  type="string"
                  name="lastName"
                  autoComplete="on"
                  placeholder="Smith"
                  {...register('lastName')}
                />
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
              </FormControl>
            </Box>

            <FormControl isInvalid={errors.email} mb={3}>
              <FormLabel fontSize={LABEL_SIZE}>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                autoComplete="on"
                placeholder="john@gmail.com"
                {...register('email')}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password} mb={3}>
              <FormLabel fontSize={LABEL_SIZE}>Password</FormLabel>
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

            <FormControl isInvalid={errors.confirmPassword} mb={3}>
              <FormLabel fontSize={LABEL_SIZE}>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  autoComplete="on"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  {...register('confirmPassword')}
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
              <FormErrorMessage>
                {errors.confirmPassword?.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              w="100%"
              type="submit"
              variant="solid"
              colorScheme="teal"
              isLoading={loading}
              isDisabled={!isValid || isSubmitting}
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
              onClick={registerWithGoogle}
            >
              Register with Google
            </Button>
            <Button
              leftIcon={<BsGithub />}
              colorScheme="blackAlpha"
              variant="solid"
              w="100%"
              mb={2}
              onClick={registerWithGithub}
            >
              Register with Github
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
        </div>
      </form>
    </Flex>
  )
}
