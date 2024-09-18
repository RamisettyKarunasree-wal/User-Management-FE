import { useEffect, useState } from 'react'
import { useAxios } from '../../../utils/axiosSetup'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
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

function UserCard({ user }) {
  return (
    <Card maxW="md">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={user.firstName} src={user.profilePic} />

            <Box>
              <Heading size="sm">{user.firstName}</Heading>
              <Text>{user.userRoleId === 1 ? 'Admin' : 'User'}, Veltris</Text>
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

  useEffect(() => {
    const getUsersList = async () => {
      try {
        dispatch(setLoading(true))
        const res = await api.get(API_PATHS.USERS_LIST)
        setUsers(new Array(9).fill(res.data[0]))
        dispatch(setLoading(false))
      } catch (error) {
        dispatch(setLoading(false))
        console.log('GetProfile ~ error:', error)
      }
    }

    getUsersList()
  }, [])

  return (
    <div
      style={{
        padding: '1rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'center',
      }}
    >
      {users.map((user) => {
        return <UserCard user={user} key={user._id} />
      })}
    </div>
  )
}
