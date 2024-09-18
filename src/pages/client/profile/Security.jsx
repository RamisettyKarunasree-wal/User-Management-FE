import { useSelector } from 'react-redux'
import useAxios from '../../../utils/axiosSetup'
import { useState } from 'react'
import { API_PATHS } from '../../../utils/constants'
import toast from 'react-hot-toast'
import { Box, Button, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import { BsArrowLeft } from 'react-icons/bs'
import { FaFileCircleCheck } from 'react-icons/fa6'

export default function Security() {
  const api = useAxios()
  const user = useSelector((state) => state.settings.user)
  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmNewPass, setConfirmNewPass] = useState('')

  const updateUser = async () => {
    const data = {
      password: newPass,
      email: user.email,
    }

    try {
      await api.post(`${API_PATHS.PASSWORD_UPDATE}`, data)
      toast.success('Password updated successfully, login again')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to updated the password')
    }
  }

  return (
    <form style={{minWidth: '430px'}}>
      <Heading as={'h6'} size={'lg'} textAlign={'center'} mb={6}>
          Change Password
        </Heading>
      <FormControl className="login-form-controller">
        <Box>
          <FormLabel fontSize={'sm'}>Current password</FormLabel>
          <Input
            type="string"
            placeholder="Current password"
            mb={6}
            value={currentPass}
            onChange={(e) => {
              setCurrentPass(e.target.value)
            }}
          />
        </Box>
        <Box>
          <FormLabel fontSize={'sm'}>New password</FormLabel>
          <Input
            type="string"
            placeholder="New password"
            mb={6}
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value)
            }}
          />
        </Box>
        <FormLabel fontSize={'sm'}>Confirm password</FormLabel>
        <Input
          type="string"
          placeholder="Confirm password"
          mb={6}
          value={confirmNewPass}
          onChange={(e) => {
            setConfirmNewPass(e.target.value)
          }}
        />
        <Box
          display={'flex'}
          justify="space-between"
          flexWrap="wrap"
          mt={'1rem'}
        >
          <Button
            flex="1"
            variant="ghost"
            colorScheme="red"
            leftIcon={<BsArrowLeft />}
          >
            Back
          </Button>
          <Button
            flex="1"
            colorScheme="green"
            variant="ghost"
            rightIcon={<FaFileCircleCheck />}
            onClick={updateUser}
          >
            Save
          </Button>
        </Box>
      </FormControl>
    </form>
  )
}
