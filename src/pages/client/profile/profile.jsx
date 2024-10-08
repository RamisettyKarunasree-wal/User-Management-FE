import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useAxios } from '../../../utils/axiosSetup'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Select,
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
  useDisclosure,
} from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa'
import { API_PATHS, USER_ROLES } from '../../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { RiEditFill } from 'react-icons/ri'
import { FaFileCircleCheck } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { setLoading, setStoreUserList, setUser } from '../../../store/settings'
import { BsArrowLeft, BsLockFill, BsUnlockFill } from 'react-icons/bs'

function EditProfile({ editMode, user }) {
  const api = useAxios()
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [role, setRole] = useState(USER_ROLES[user?.userRole].value)
  const storeUser = useSelector((state) => state.settings.user)
  const [saveLoader, setSaveLoader] = useState(false)

  const updateUser = async () => {
    const data = {
      firstName,
      lastName,
      email: user.email,
      userRoleId: parseInt(role),
    }
    setSaveLoader(true)
    try {
      const res = await api.patch(`${API_PATHS.USER_UPDATE}/${user._id}`, data)
      if (res.status === 200) {
        editMode(false)
        toast.success('Updated the profile details')
        dispatch(setUser(res.data))
        if (storeUser.userRole === USER_ROLES.ADMIN.key) {
          try {
            const _res = await api.get(API_PATHS.USERS_LIST)
            dispatch(setStoreUserList(_res.data))
          } catch (error) {
            toast.error('Failed to get updated list of users.')
          }
        }
      }
    } catch (error) {
      toast.error('Failed to updated the profile details')
    }
    setSaveLoader(false)
  }

  return (
    <Card className="edit-profile-name">
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
          <FormLabel fontSize={'sm'}>User Role</FormLabel>
          <Select
            placeholder="Select a role"
            value={role}
            defaultValue={role}
            onChange={(e) => {
              setRole(e.target.value)
            }}
          >
            {Object.entries(USER_ROLES).map(([key, value]) => {
              return (
                <option value={value.value} key={key}>
                  {key}
                </option>
              )
            })}
          </Select>

          <Flex justify="space-between" mt={'1rem'}>
            <Button leftIcon={<BsArrowLeft />} onClick={() => editMode(false)}>
              Back
            </Button>
            <Button
              colorScheme="green"
              rightIcon={<FaFileCircleCheck />}
              onClick={updateUser}
              isLoading={saveLoader}
            >
              Save
            </Button>
          </Flex>
        </FormControl>
      </form>
    </Card>
  )
}
EditProfile.propTypes = {
  editMode: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default function Profile({ user }) {
  const api = useAxios()
  const dispatch = useDispatch()
  const [isSignOutLoading, setSignOutLoading] = useState(false)
  const [isEditMode, setEditMode] = useState(false)
  const storeUser = useSelector((state) => state.settings.user)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const signOutProcedure = async () => {
    try {
      setSignOutLoading(true)
      await api.get(API_PATHS.AUTH_SIGN_OUT)
      setSignOutLoading(false)
    } catch (error) {
      setSignOutLoading(false)
    }
  }

  useEffect(() => {
    setEditMode(false)
  }, [user, storeUser])

  const blockUser = async (isActive = true) => {
    try {
      setLoading(true)
      const params = { status: isActive }
      await api.patch(`${API_PATHS.BLOCK_USER}/${user._id}`, {}, { params })
      const _res = await api.get(API_PATHS.USERS_LIST)
      dispatch(setStoreUserList(_res.data))
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const deleteActionHandler = async () => {
    try {
      setLoading(true)
      await api.delete(`${API_PATHS.DELETE_USER}/${user._id}`)
      const _res = await api.get(API_PATHS.USERS_LIST)
      dispatch(setStoreUserList(_res.data))
      onClose()
      setLoading(false)
    } catch (error) {
      onClose()
      setLoading(false)
    }
  }

  const toggleModeChange = (mode) => setEditMode(mode)

  return (
    <>
      {isEditMode ? (
        <EditProfile editMode={toggleModeChange} user={user} />
      ) : (
        <Card w={'100%'} h={'100%'}>
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={user.fullName} src={user.picture} />
                <Box>
                  <Heading size="sm">{user.fullName}</Heading>
                  <Text>Role: {user.userRole}</Text>
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
                  {user.deletedAt && (
                    <Tr>
                      <Td>Deleted At</Td>
                      <Td>{new Date(user.deletedAt).toLocaleString()}</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
          {user.deletedAt === null && (
            <CardFooter justify="space-evenly" flexWrap="wrap">
              <Button
                colorScheme="yellow"
                rightIcon={<RiEditFill />}
                onClick={() => {
                  setEditMode(!isEditMode)
                }}
              >
                Edit
              </Button>
              {storeUser?.userRole === USER_ROLES.ADMIN.key &&
                user.email !== storeUser.email && (
                  <>
                    {user.isActive ? (
                      <Button
                        colorScheme="red"
                        rightIcon={<BsLockFill />}
                        onClick={() => {
                          blockUser(true)
                        }}
                      >
                        Block
                      </Button>
                    ) : (
                      <Button
                        colorScheme="orange"
                        rightIcon={<BsUnlockFill />}
                        onClick={() => {
                          blockUser(false)
                        }}
                      >
                        Unblock
                      </Button>
                    )}
                  </>
                )}
              {storeUser?.userRole === USER_ROLES.ADMIN.key &&
                user.email !== storeUser.email && (
                  <>
                    <Button colorScheme="red" onClick={onOpen}>
                      Delete
                    </Button>
                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete User
                          </AlertDialogHeader>

                          <AlertDialogBody>Are you sure?</AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={deleteActionHandler}
                              ml={3}
                            >
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </>
                )}
              {storeUser.email === user.email && (
                <Button
                  colorScheme="red"
                  rightIcon={<FaSignOutAlt />}
                  onClick={signOutProcedure}
                  isLoading={isSignOutLoading}
                >
                  Sign Out
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      )}
    </>
  )
}
Profile.propTypes = {
  user: PropTypes.object.isRequired,
}
