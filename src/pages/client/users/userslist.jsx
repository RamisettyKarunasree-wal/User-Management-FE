import { useEffect, useState } from 'react'
import { useAxios } from '../../../utils/axiosSetup'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react'
import { API_PATHS } from '../../../utils/constants'
import { setLoading } from '../../../store/settings'
import { useDispatch } from 'react-redux'
import './userList.scss'
import { FaUserCheck } from 'react-icons/fa'

function UserCardShort({ user, onClick }) {
  return (
    <Card
      className="user-card-short"
      onClick={() => {
        onClick(user)
      }}
    >
      <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
        <Avatar name={user.firstName} src={user.profilePic} />
        <Box>
          <Heading size="sm">{`${user.firstName} ${user.lastName || ''}`}</Heading>
          <Text fontSize={'xs'}>{user.email}</Text>
        </Box>
      </Flex>
    </Card>
  )
}

UserCardShort.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

function UserNotSelected() {
  return (
    <Flex className="user-not-selected">
      <Center className="icon-caption">
        <FaUserCheck size={64} />
        <Text fontSize={'md'} mt={2}>
          Select any profile
        </Text>
      </Center>
    </Flex>
  )
}

function UserCard({ user }) {
  return (
    <Card maxW="md">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={user.firstName} src={user.profilePic} />

            <Box>
              <Heading size="sm">{user.firstName}</Heading>
              <Text>{user.userRole}, Veltris</Text>
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
                <Td>{user.isActive ? 'Active' : 'Not Active'}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  )
}
UserCard.propTypes = {
  user: PropTypes.object.isRequired,
}

export default function UsersList() {
  const api = useAxios()
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const [currentSelected, setCurrentSelected] = useState(null)

  useEffect(() => {
    const getUsersList = async () => {
      try {
        dispatch(setLoading(true))
        const res = await api.get(API_PATHS.USERS_LIST)
        setUsers(res.data)
        dispatch(setLoading(false))
      } catch (error) {
        dispatch(setLoading(false))
      }
    }

    getUsersList()
  }, [])

  return (
    <Flex className='user-list-wrapper'>
      <Box className='profile-list-view'>
        <Box className='user-search-box'>
          <Text fontSize={'xs'}>Search user</Text>
          <Input type="text" placeholder="John" />
        </Box>
        <Box className='user-list-container'>
          {users.map((user) => {
            return (
              <UserCardShort
                user={user}
                key={user._id}
                onClick={(user) => {
                  setCurrentSelected(user)
                }}
              />
            )
          })}
        </Box>
      </Box>
      <Box w={'100%'}>
        {currentSelected ? (
          <>
            <p>Profile</p>
            <pre>{JSON.stringify(currentSelected, null, '\t')}</pre>
          </>
        ) : (
          <UserNotSelected />
        )}
      </Box>
    </Flex>
  )
}
