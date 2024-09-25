import { Link } from 'react-router-dom'
import { NAV_LIST, ROUTES } from '../../utils/constants'
import { Avatar, Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { Logo } from '../../assets'
import './Header.scss'
import { useSelector } from 'react-redux'

export default function Header() {
  const user = useSelector((state) => state.settings.user)

  return (
    <div className="desktop-static-pages-header">
      <Flex>
        <div className="logo-and-name">
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
        </div>
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
      <Flex spacing="4">
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar name={user.fullName} src={user.picture} />

          <Box>
            <Heading size="xs">{user.fullName}</Heading>
            <Text fontSize={'xs'}>Role: {user.userRole}</Text>
          </Box>
        </Flex>
      </Flex>
    </div>
  )
}
