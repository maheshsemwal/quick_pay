import React from 'react'
import ImageComp from '../components/ImageComp'
import { useNavigate } from 'react-router-dom'
const UserlList = ({user}) => {
    const navigate = useNavigate()
  return (
    <div className='flex items-center justify-between p-5 hover:bg-gray-200 rounded-xl mt-3 '>
        <ImageComp imageUrl={user.profilePic} className="flex-1"/>
        <div className='flex-1 font-bold text-xl ml-5'>
        {`${user.firstName}  ${user.lastName}`}
        </div>
        <button className='bg-gray-300 p-4 rounded-md font-semibold hover:bg-gray-400' onClick={() => {
            navigate(`/send?id=${user._id}&name=${user.firstName}&profileUrl=${user.profilePic}`)
        }}>Send Money</button>
    </div>
  )
}

export default UserlList
