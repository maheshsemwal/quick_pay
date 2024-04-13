import React, { lazy, Suspense } from 'react'
const LoginPage = lazy(()=> import('./pages/LoginPage'))
const SignupPage = lazy(()=> import('./pages/SignupPage'))
const LandingPage = lazy(()=> import('./pages/LandingPage'))
const HomePage = lazy(()=> import('./pages/HomePage'))
import { Routes, Route, useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()
  return (
    <div className='h-full'>
  
      <Suspense fallback={".....loding"}>
      <Routes>

        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
      </Routes>
        </Suspense>
    </div>
  )
}

export default App
