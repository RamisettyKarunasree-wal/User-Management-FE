import { ChakraProvider } from '@chakra-ui/react'
import AppRoutes from './AppRoutes'
import './styles/styles.scss'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <AppRoutes />
        <Toaster position='top-right'/>
      </ChakraProvider>
    </div>
  )
}

export default App
