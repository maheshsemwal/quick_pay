import React from 'react'
import Logo from './Logo'
import ImageComp from '../components/ImageComp'
import { useNavigate } from 'react-router-dom'  
import { useRecoilValue} from 'recoil'
import { loggedInUser } from '../store/atom/atoms'
const NavBar = () => {
const user = useRecoilValue(loggedInUser);
const navigate = useNavigate()
return (
    <div className='flex justify-between items-center pr-6 pl-6 pt-4 pb-4 bg-blue-200 shadow-2xl'>
      <Logo/>
      <div className='flex items-center'>
        <span className="mr-5 font-semibold text-xl">Hello, <span className='font-bold'>{user.FirstName}</span></span>
        <ImageComp imageUrl={user.profilePic}/>
        <button className='ml-3 font-semibold hover:text-blue-500'
        onClick={()=>{
          localStorage.clear('userInfo')
          navigate("/login")
        }}
        >Log out</button>
      </div>
    </div>
  )
  
}

export default NavBar
