import React, { lazy, Suspense } from 'react'
const LoginPage = lazy(()=> import('./pages/LoginPage'))
const SignupPage = lazy(()=> import('./pages/SignupPage'))
const LandingPage = lazy(()=> import('./pages/LandingPage'))
const Dashboard = lazy(()=> import('./pages/Dashboard'))
import { Routes, Route, useNavigate } from 'react-router-dom'
import SendMoney from './pages/SendMoney'
import PaymentSuccess from './pages/PaymentSuccess'

const App = () => {
  const navigate = useNavigate()
  return (
    <div className='h-full'>
  
      <Suspense fallback={".....loding"}>
      <Routes>

        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/send' element={<SendMoney/>}/>
        <Route path='/success' element={<PaymentSuccess/>}/>
      </Routes>
        </Suspense>
    </div>
  )
}

export default App
