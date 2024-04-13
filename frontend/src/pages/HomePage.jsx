import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (!userInfo) {
      navigate('/login')
    }
  }, [navigate])
  return (
    <div>
      Welcome to homePage
    </div>
  )
}

export default HomePage
