import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Layout from '~/layouts'
import HomePage from '~/pages/Home'
import LandingPage from '~/pages/Authentication/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='/login' element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
