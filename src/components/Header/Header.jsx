import { Link } from 'react-router-dom'
import { NAV_LIST, ROUTES } from '../../utils/constants'
import { Image } from '@chakra-ui/react'
import { Logo } from '../../assets'
import './Header.scss'
import { useSelector } from 'react-redux'

export default function Header() {
  const user = useSelector((state) => state.settings.user)

  return (
    <div className="desktop-static-pages-header">
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
        {NAV_LIST.filter(
          (n) => {
            if (!n.protection) return true
            else return n.protection.roles.some(r => r === user.userRole)
          }).map((nav) => {
          return (
            <Link to={nav.link} key={nav.link} className="nav-item">
              {nav.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
