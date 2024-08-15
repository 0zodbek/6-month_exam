import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Error from './pages/ErrorPage/Error.jsx'
import Login from './pages/LoginPage/Login.jsx'
import Register from "./pages/RegisterPage/Regiser.jsx"

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  let token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (token.value) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      if (!window.location.pathname.includes('register')) {
        navigate("/login");
      }
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      {isAuth && (
        <>
          <Route path='/' element={<Home />} />
        </>
      )}
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

export default App