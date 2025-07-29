import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Welcome from './pages/Welcome'

export const backendUrl = import.meta.env.VITE_BACKEND_URL;


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />} />
      <Route path='/welcome' element={<Welcome />} />
    </Routes>
  )
}

export default App
