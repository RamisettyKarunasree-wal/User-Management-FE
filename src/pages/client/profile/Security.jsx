import { useSelector } from 'react-redux'
import useAxios from '../../../utils/axiosSetup'
import { useState } from 'react'
import { API_PATHS, FormSchemas } from '../../../utils/constants'
import toast from 'react-hot-toast'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs'
import { FaFileCircleCheck } from 'react-icons/fa6'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { apiErrorHandler } from '../../../utils/utilities'

export default function Security() {
  const api = useAxios()
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.settings.user)
  const [showPassword, setShowPassword] = useState(false)

  const updateUserPassword = async (formData) => {
    setLoading(true)
    const data = {
      password: formData.newPassword,
      email: user.email,
    }

    try {
      await api.post(`${API_PATHS.PASSWORD_UPDATE}`, data)
      setLoading(false)
      toast.success('Password updated successfully, login again')
    } catch (error) {
      setLoading(false)
      apiErrorHandler(error)
    }
  }

  const passChangeSchema = yup.object().shape({
    password: FormSchemas.password,
    newPassword: FormSchemas.password
      .required('New password is required')
      .notOneOf(
        [yup.ref('password')],
        'New password must be different from the current password',
      ),
    confirmNewPassword: FormSchemas.password
      .required('Confirm new password is required')
      .oneOf([yup.ref('newPassword'), null], 'New Passwords must match'),
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
    <form
      style={{ minWidth: '430px' }}
      onSubmit={handleSubmit(updateUserPassword)}
    >
      <Heading as={'h6'} size={'lg'} textAlign={'center'} mb={6}>
        Change Password
      </Heading>
      <div className="login-form-controller">
        <FormControl isInvalid={errors.password} mb={5}>
          <FormLabel fontSize={'sm'}>Current password</FormLabel>
          <InputGroup>
            <Input
              name="password"
              autoComplete="on"
              {...register('password')}
              placeholder="Current password"
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

        <FormControl isInvalid={errors.newPassword} mb={5}>
          <FormLabel fontSize={'sm'}>New Password</FormLabel>
          <InputGroup>
            <Input
              name="newPassword"
              autoComplete="on"
              {...register('newPassword')}
              placeholder="New password"
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
          <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.confirmNewPassword} mb={5}>
          <FormLabel fontSize={'sm'}>Confirm New Password</FormLabel>
          <InputGroup>
            <Input
              autoComplete="on"
              name="confirmNewPassword"
              {...register('confirmNewPassword')}
              placeholder="Confirm New Password"
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
            {errors.confirmNewPassword?.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          w={'100%'}
          type="submit"
          variant="ghost"
          colorScheme="green"
          rightIcon={<FaFileCircleCheck />}
          isLoading={loading}
          isDisabled={!isValid || isSubmitting}
        >
          Save
        </Button>
      </div>
    </form>
  )
}
