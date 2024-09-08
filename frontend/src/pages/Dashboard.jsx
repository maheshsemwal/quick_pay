import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useSetRecoilState } from 'recoil'
import { loggedInUser } from '../store/atom/atoms'
import Balance from '../components/Balance'
import GetAllUsers from '../components/GetAllUsers'
const Dashboard = () => {
  const navigate = useNavigate()
  const setLoggedUser = useSetRecoilState(loggedInUser)
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (!userInfo) 
      navigate('/login')
  })
  return (
    <div className='h-full bg-gray-300'>
      <NavBar/>
      <div className='bg-white rounded-3xl p-5 '>
        <div className='pl-5'>
        <Balance/>
        </div>
        <GetAllUsers/>
      </div>
    </div>
  )
}

export default Dashboard
