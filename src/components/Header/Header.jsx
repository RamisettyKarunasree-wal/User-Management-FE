import { Link } from 'react-router-dom'
import { API_PATHS, NAV_LIST, ROUTES } from '../../utils/constants'
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { Logo } from '../../assets'
import './Header.scss'
import { useSelector } from 'react-redux'
import useAxios from '../../utils/axiosSetup'

export default function Header() {
  const api = useAxios()
  const user = useSelector((state) => state.settings.user)

  const signOutProcedure = async () => {
    await api.get(API_PATHS.AUTH_SIGN_OUT)
  }

  return (
    <div className="desktop-static-pages-header">
      <Flex>
        <Link
          to={ROUTES.HOME.link}
          key={ROUTES.HOME.link}
          className="nav-link home-icon"
        >
          <Image
            className="icon"
            src={Logo}
            alt={import.meta.env.VITE_APP_TITLE}
          />
        </Link>
        <div className="static-nav-list">
          {NAV_LIST.filter((n) => {
            if (!n.protection) return true
            else return n.protection.roles.some((r) => r === user.userRole)
          }).map((nav) => {
            return (
              <Link to={nav.link} key={nav.link} className="nav-item">
                {nav.label}
              </Link>
            )
          })}
        </div>
      </Flex>
      <Flex flexWrap="wrap">
        <Box textAlign={'right'}>
          <Heading size="xs">{user.fullName}</Heading>
          <Text fontSize={'xs'}>Role: {user.userRole}</Text>
        </Box>
        <Menu>
          <MenuButton as={Button} colorScheme="ghost">
            <Avatar name={user.fullName} src={user.picture} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={signOutProcedure}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </div>
  )
}
