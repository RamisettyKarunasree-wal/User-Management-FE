import PropTypes from 'prop-types'

import { useEffect } from 'react'
import './Loader.scss'

export default function Loader({ loading }) {
  useEffect(() => {
    const display = loading ? 'block' : 'none'
    document.getElementById('overlay').style.display = display
  }, [loading])

  return (
    <div id="overlay">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
}
