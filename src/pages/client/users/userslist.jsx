import { useEffect, useState } from 'react'
import { useAxios } from '../../../utils/axiosSetup'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Card,
  Center,
  Flex,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'
import { API_PATHS } from '../../../utils/constants'
import { setLoading, setStoreUserList } from '../../../store/settings'
import { useDispatch, useSelector } from 'react-redux'
import './userList.scss'
import { FaUserCheck } from 'react-icons/fa'
import Profile from '../profile/profile'
import { DebounceInput } from 'react-debounce-input'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'

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

export default function UsersList() {
  const PER_PAGE_LIMIT = 5
  const api = useAxios()
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [currentSelected, setCurrentSelected] = useState(null)
  const users = useSelector((state) => state.settings.userList)

  const getUsersList = async (params) => {
    try {
      dispatch(setLoading(true))
      const res = await api.get(API_PATHS.USERS_LIST, { params })
      const countRes = await api.get(API_PATHS.USERS_COUNT, { params })
      dispatch(setStoreUserList(res.data))
      setTotalPages(
        countRes.data.count % PER_PAGE_LIMIT > 0
          ? parseInt(countRes.data.count / PER_PAGE_LIMIT) + 1
          : parseInt(countRes.data.count / PER_PAGE_LIMIT),
      )
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getUsersList({ page, limit: PER_PAGE_LIMIT })
  }, [page])

  useEffect(() => {
    const current = users.find((user) => user._id === currentSelected?._id)
    if (!current) return;
    setCurrentSelected(current)
  }, [users, currentSelected?._id])

  return (
    <Flex className="user-list-wrapper">
      <Box className="profile-list-view">
        <Box className="user-search-box">
          <Text fontSize={'sm'}>Search user</Text>
          <DebounceInput
            element={Input}
            minLength={2}
            debounceTimeout={500}
            placeholder="John"
            onChange={(e) => {
              getUsersList({ name: e.target.value })
            }}
          />
        </Box>
        <Box className="user-list-container">
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
        {totalPages > 1 && (
          <ResponsivePagination
            current={page}
            total={totalPages}
            onPageChange={setPage}
          />
        )}
      </Box>
      <Box
        style={{
          width: '100%',
        }}
      >
        {currentSelected ? (
          <Profile user={currentSelected} />
        ) : (
          <UserNotSelected />
        )}
      </Box>
    </Flex>
  )
}
