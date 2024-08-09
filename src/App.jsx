import { useState, useEffect } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Error from './pages/ErrorPage/Error.jsx'
import Login from './pages/LoginPage/Login.jsx'
import Register from './pages/RegisterPage/Regiser.jsx'
function App() {
  const [count, setCount] = useState(0)
  const [isAuth, setIsAuth] = useState(false);
  let token = JSON.parse(JSON.stringify("token"))
  useEffect(
    function(){
    if(token){
      setIsAuth(true);
    }else{
      setIsAuth(false)
      if( !location.pathname.includes('register')){
      navigate("/login")
      }
    }
    },
    [token, location.pathname]
    );
  return (
    <Routes>
      <Route path='/' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      {/* <Route path='/home' element={<Home></Home>}></Route> */}
      isAuth && 
        (
          <>
          {console.log("salom1")}
            <Route path='/home' element={<Home></Home>}></Route>
            {console.log("salom2")}
          </>
        )

      <Route path='*' element={<Error></Error>}></Route>
    </Routes>
  )
}

export default App
