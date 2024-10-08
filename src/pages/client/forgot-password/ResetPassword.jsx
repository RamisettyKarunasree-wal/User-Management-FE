import { useSelector } from 'react-redux'
import useAxios from '../../../utils/axiosSetup'
import { useState } from 'react'
import { API_PATHS, FormSchemas, ROUTES } from '../../../utils/constants'
import toast from 'react-hot-toast'
import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs'
import { FaFileCircleCheck } from 'react-icons/fa6'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { apiErrorHandler } from '../../../utils/utilities'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthBanner } from '../../../components'
import { AuthForm } from '../../../assets'

export default function AppResetPassword() {
  return (
    <AuthBanner
      authType={ROUTES.SIGN_IN.label}
      authProvider={<ResetPassword />}
      bannerImage={AuthForm}
    />
  )
}

function ResetPassword() {
  const api = useAxios()
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.settings.user)
  const [showPassword, setShowPassword] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const updateUserPassword = async (formData) => {
    setLoading(true)
    const data = {
      password: formData.password,
      email: user.email,
    }
    try {
      const res = await api.post(`${API_PATHS.RESET_PASSWORD}`, data, {
        params: { token: searchParams.get('token') },
      })
      setLoading(false)
      toast.success(res.data.message)
      navigate(ROUTES.SIGN_IN.link)
    } catch (error) {
      setLoading(false)
      apiErrorHandler(error)
    }
  }

  const passChangeSchema = yup.object().shape({
    password: FormSchemas.password,
    confirmPassword: FormSchemas.password
      .required('Confirm new password is required')
      .oneOf([yup.ref('password'), null], 'Confirm Passwords must match'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(passChangeSchema),
  })

  return (
    <Center mt={10}>
      <form
        style={{ minWidth: '430px' }}
        onSubmit={handleSubmit(updateUserPassword)}
      >
        <Heading as={'h6'} size={'lg'} textAlign={'center'} mb={6}>
          Set Password
        </Heading>
        <div className="login-form-controller">
          <FormControl isInvalid={errors.password} mb={5}>
            <FormLabel fontSize={'sm'}>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                autoComplete="on"
                {...register('password')}
                placeholder="Password"
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

          <FormControl isInvalid={errors.confirmPassword} mb={5}>
            <FormLabel fontSize={'sm'}>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                autoComplete="on"
                name="confirmPassword"
                {...register('confirmPassword')}
                placeholder="Confirm Password"
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
            w={'100%'}
            type="submit"
            colorScheme="green"
            rightIcon={<FaFileCircleCheck />}
            isLoading={loading}
            isDisabled={!isValid || isSubmitting}
          >
            Save
          </Button>
          <Text fontSize={'sm'} textAlign={'right'} mt={5}>
            Remember password? {" "}
            <Link to={ROUTES.SIGN_IN.link}>
              <Text as={'b'} color={'blue'}>
                {ROUTES.SIGN_IN.label}
              </Text>
            </Link>
          </Text>
        </div>
      </form>
    </Center>
  )
}
