import { ROUTES } from '../../../utils/constants'
import './HomePage.scss'
import { Link } from 'react-router-dom'

export default function HomePage() {
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
            <Link className="landing-btn" to={ROUTES.PROFILE.link}>
              Start
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
