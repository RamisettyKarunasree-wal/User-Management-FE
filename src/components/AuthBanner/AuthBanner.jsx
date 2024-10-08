import PropTypes from 'prop-types'
import { Box, Center, Flex } from '@chakra-ui/react'
import { useMediaQuery } from 'react-responsive'
import { MOBILE_VIEW_WIDTH, ROUTES } from '../../utils/constants'
import './AuthBanner.scss'

export function AuthBanner({ authType, authProvider, bannerImage }) {
  const isTabletOrMobile = useMediaQuery({
    query: `(max-width: ${MOBILE_VIEW_WIDTH}px)`,
  })

  const mobileStyles = {
    direction: 'column',
    w: '100%',
    h: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
  const desktopStyles = {
    direction: 'column',
    w: '100%',
    h: 'fit-content',
    p: '3rem 2rem',
    alignItems: authType === ROUTES.SIGN_IN.label ? 'flex-end' : 'flex-start',
  }

  return (
    <Flex
      className="auth-container"
      w={isTabletOrMobile ? '100%' : '80%'}
      h={isTabletOrMobile ? '100%' : '100%'}
      m={'auto'}
      alignItems={'center'}
      justifyContent="center"
      direction={authType === ROUTES.SIGN_IN.label ? 'row-reverse' : 'row'}
    >
      <Center
        h="100%"
        w={isTabletOrMobile ? '100%' : '40%'}
        minW={!isTabletOrMobile ? '550px' : null}
        style={{
          backgroundColor: '#fff',
          transition: 'all 1s ease-out',
        }}
      >
        <Flex {...(isTabletOrMobile ? mobileStyles : desktopStyles)} className='auth-provider'>
          {authProvider}
        </Flex>
      </Center>
      {!isTabletOrMobile ? (
        <Box
          className="image-container"
          w="60%"
          h="100%"
          style={{
            backgroundColor: '#fff',
            backgroundImage: `url("${bannerImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ) : null}
    </Flex>
  )
}

AuthBanner.propTypes = {
  authProvider: PropTypes.element.isRequired,
  bannerImage: PropTypes.string.isRequired,
  authType: PropTypes.string.isRequired,
}
