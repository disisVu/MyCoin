import { Outlet } from 'react-router-dom'
import Header from '~/components/Header'
import { Box } from '@mui/material'

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', direction: 'column', width: '100%', height: '100vh', padding: 0, backgroundColor: 'white' }}>
      <Header />
      <Box sx={{ width: '100%', paddingTop: '50px' }}>
        <Outlet />
      </Box>
    </Box>
  )
}