import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Layout from '~/layouts'
import HomePage from '~/pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
