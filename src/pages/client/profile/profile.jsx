import { useState } from 'react'
import PropTypes from 'prop-types'
import { useAxios } from '../../../utils/axiosSetup'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa'
import { API_PATHS } from '../../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { RiEditFill } from 'react-icons/ri'
import { FaFileCircleCheck } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { setUser } from '../../../store/settings'
import { BsArrowLeft } from 'react-icons/bs'

function EditProfile({ editMode }) {
  const api = useAxios()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.settings.user)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)

  const updateUser = async () => {
    const data = {
      firstName,
      lastName,
      email: user.email,
    }
    try {
      const res = await api.patch(`${API_PATHS.USER_UPDATE}/${user._id}`, data)
      if (res.status === 200) {
        editMode(false)
        toast.success('Updated the profile details')
        dispatch(setUser(res.data))
      }
    } catch (error) {
      toast.error('Failed to updated the profile details')
    }
  }

  return (
    <form>
      <FormControl className="login-form-controller">
        <Box display={'flex'} justifyContent={'space-between'} gap={'1rem'}>
          <Box>
            <FormLabel fontSize={'sm'}>First Name</FormLabel>
            <Input
              type="string"
              placeholder="John"
              mb={6}
              id="firstName"
              name="firstName"
              autoComplete="on"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
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
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
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
          value={user.email}
          disabled
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
            onClick={() => editMode(false)}
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
EditProfile.propTypes = {
  editMode: PropTypes.func.isRequired,
}

export default function Profile() {
  const api = useAxios()
  const user = useSelector((state) => state.settings.user)
  const [isSignOutLoading, setSignOutLoading] = useState(false)
  const [isEditMode, setEditMode] = useState(false)

  const signOutProcedure = async () => {
    try {
      setSignOutLoading(true)
      await api.get(API_PATHS.AUTH_SIGN_OUT)
      setSignOutLoading(false)
    } catch (error) {
      setSignOutLoading(false)
    }
  }

  const toggleModeChange = (mode) => setEditMode(mode)

  return (
    <Center>
      {isEditMode ? (
        <EditProfile editMode={toggleModeChange} />
      ) : (
        <Card maxW="md">
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={user.fullName} src={user.picture} />

                <Box>
                  <Heading size="sm">{user.fullName}</Heading>
                  <Text>Role: {user.userRole.toLowerCase()}</Text>
                </Box>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>ID</Td>
                    <Td>{user._id}</Td>
                  </Tr>
                  <Tr>
                    <Td>Email</Td>
                    <Td>{user.email}</Td>
                  </Tr>
                  <Tr>
                    <Td>Status</Td>
                    <Td>{user.isActive ? 'Verified' : 'Not verified'}</Td>
                  </Tr>
                  <Tr>
                    <Td>Registered At</Td>
                    <Td>{new Date(user.createdAt).toLocaleString()}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
          <CardFooter justify="space-between" flexWrap="wrap">
            <Button
              flex="1"
              colorScheme="yellow"
              variant="ghost"
              rightIcon={<RiEditFill />}
              onClick={() => {
                setEditMode(!isEditMode)
              }}
            >
              Edit
            </Button>
            <Button
              flex="1"
              variant="ghost"
              rightIcon={<FaSignOutAlt />}
              onClick={signOutProcedure}
              isLoading={isSignOutLoading}
            >
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      )}
    </Center>
  )
}
