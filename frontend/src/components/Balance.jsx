import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { loggedInUser } from '../store/atom/atoms'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Balance = () => {
    const [balance, setBalace] = useState('0.00')
    const [loading, setLoading] = useState(false)
    const user = useRecoilValue(loggedInUser)
    useEffect(() => {
        return async function getBalance() {
            try {
                setLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/account/balance?userId=${user._id}`,{
                        headers: {
                            "content-type": 'application/json',
                            "Authorization": `Bearer ${user.token}`
                        }
                    })
                    setBalace(response.data.balance)
                    setLoading(false)
            } catch (e) {
                toast.error(`${e.message}`)
                setLoading(false)
            }
        }
    }, [user._id])

    return (
        <>
            <div className='text-gray-400 font-semibold font-sans'>Balance</div>
            <div className='text-6xl font-medium font-sans'>
                ₹{balance}
            </div>
            <ToastContainer position="top-right" theme="light" autoClose={5000} />
        </>
    )
}

export default Balance
