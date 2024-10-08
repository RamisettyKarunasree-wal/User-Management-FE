import './HomePage.scss'
import moment from 'moment/moment'
import { ROUTES } from '../../../utils/constants'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function HomePage() {
  const storeUser = useSelector((state) => state.settings.user)
  return (
    <>
      <section className="landing-section">
        <div className="landing-heading" data-aos="zoom-y-out">
          <p>Simple OAuth User management</p>
          <p>with NestJS, PassportJS</p>
        </div>
        <div className="landing-subsection">
          <code>
            <q>A Small project for big learnings</q>
          </code>
          <div className="landing-btn-container">
            <Link
              className="landing-btn"
              to={
                storeUser &&
                storeUser._id &&
                moment().unix() < storeUser.expires_at &&
                storeUser.isAuthorized
                  ? ROUTES.PROFILE.link
                  : ROUTES.SIGN_IN.link
              }
            >
              Start
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
