import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
} from '@chakra-ui/react'
import Profile from './profile'
import Security from './Security'
import { useSelector } from 'react-redux'

export default function AccountSettings() {
  const user = useSelector((state) => state.settings.user)

  return (
    <Center mt="1rem">
      <Tabs
        orientation="vertical"
        style={{
          border: 'none',
          backgroundColor: '#fff',
          borderRadius: '0.5rem',
        }}
      >
        <TabList
          style={{
            border: 'none',
            padding: '2rem 3rem 2rem 2rem',
            backgroundColor: '#fff',
            borderRadius: '0.5rem',
            borderRight: '2px solid #f0f0f0',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Tab>Profile</Tab>
          {user?.isPasswordSet && <Tab>Security</Tab>}
        </TabList>

        <TabPanels
          style={{
            border: 'none',
            padding: '2rem',
            backgroundColor: '#fff',
            borderRadius: '0.5rem',
          }}
        >
          <TabPanel>
            <Profile user={user} />
          </TabPanel>
          {user?.isPasswordSet && (
            <TabPanel>
              <Security />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Center>
  )
}
