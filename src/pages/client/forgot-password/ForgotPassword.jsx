import useAxios from '../../../utils/axiosSetup'
import { useState } from 'react'
import { API_PATHS, FormSchemas, ROUTES } from '../../../utils/constants'
import toast from 'react-hot-toast'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  Text,
} from '@chakra-ui/react'
import { FaFileCircleCheck } from 'react-icons/fa6'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { apiErrorHandler } from '../../../utils/utilities'
import { AuthForm, Logo } from '../../../assets'
import { AuthBanner } from '../../../components'
import { Link } from 'react-router-dom'

export default function AppForgotPassword() {
  return (
    <AuthBanner
      authType={ROUTES.SIGN_UP.label}
      authProvider={<ForgotPassword />}
      bannerImage={AuthForm}
    />
  )
}

function ForgotPassword() {
  const api = useAxios()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const forgotPasswordHandler = async (formData) => {
    setLoading(true)
    const data = { email: formData.email }
    try {
      const res = await api.post(`${API_PATHS.FORGOT_PASSWORD}`, data)
      toast.success(res.data.message)
      setStatus(res.data.message)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setStatus(error?.response?.data?.message)
      apiErrorHandler(error)
    }
  }

  const forgotPasswordSchema = yup.object().shape({
    email: FormSchemas.email,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(forgotPasswordSchema),
  })

  return (
    <Box
      w={'100%'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit(forgotPasswordHandler)}
        style={{ minWidth: '400px' }}
      >
        <Flex alignItems={'center'} flexDirection={'column'} gap={'1rem'}>
          <Image
            className="icon"
            src={Logo}
            alt={import.meta.env.VITE_APP_TITLE}
          />
          <Heading as={'h6'} size={'lg'} textAlign={'center'} mb={10}>
            Forgot Password
          </Heading>
        </Flex>
        <div className="login-form-controller">
          <FormControl isInvalid={errors.email} mb={5}>
            <Input
              name="email"
              autoComplete="on"
              {...register('email')}
              placeholder="john@gmail.com"
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <Button
            w={'100%'}
            type="submit"
            colorScheme="green"
            rightIcon={<FaFileCircleCheck />}
            isLoading={loading}
            isDisabled={!isValid || isSubmitting}
          >
            Save
          </Button>

          <FormControl isInvalid={status} mt={5}>
            <FormErrorMessage textAlign={'center'}>{status}</FormErrorMessage>
          </FormControl>

          <Text fontSize={'sm'} textAlign={'right'} mt={5}>
            Remember password?{' '}
            <Link to={ROUTES.SIGN_IN.link}>
              <Text as={'b'} color={'blue'}>
                {ROUTES.SIGN_IN.label}
              </Text>
            </Link>
          </Text>
        </div>
      </form>
    </Box>
  )
}
