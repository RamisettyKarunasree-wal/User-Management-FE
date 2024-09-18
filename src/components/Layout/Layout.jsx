import './Layout.scss'
import PropTypes from 'prop-types'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Header/Header'

const STATIC_PAGE_STYLES = {}

export default function Layout({ alignment }) {
  const location = useLocation()
  let styles = STATIC_PAGE_STYLES

  return (
    <div style={styles} className="layout">
      {location.pathname !== '/' ? <Header /> : null}
      <div className={`outlet-container ${alignment.toLowerCase()}`}>
        <Outlet />
      </div>
    </div>
  )
}

Layout.propTypes = {
  alignment: PropTypes.string.isRequired,
  needFooter: PropTypes.bool,
}
