import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../components/Logo'
const LoginPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            if(userInfo){
                navigate('/dashboard')
               }
    }, [navigate])
    const handleLogin = async() => {
        setLoading(true)
        if (!email || !password) {
            toast.error("please Enter all the fields")
            setLoading(false);
            return
        }
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const {data} = await axios.post('http://localhost:3000/api/v1/user/login', {username: email, password: password}, config);
            toast.success("Login Successfull");
            localStorage.setItem("userInfo", JSON.stringify(data))
            setLoading(false)
            navigate('/dashboard')
        } catch(e){
            toast.error(`Invalid Email or Password`)
            setLoading(false)
        }
    }
    return (
        <>
            <div className='grid place-content-center h-full w-auto'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer hover:scale-150 mb-2" onClick={() => {
                    navigate('/')
                }}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <div className='text-center bg-slate-300 pt-20 pl-32 pr-32 p-20 rounded-lg'>

                <Logo/>
                    <div className='text-2xl font-semibold italic text-blue-900 mt-9'>Login to Your Account</div>
                    <div className='text-2xl font-semibold mb-9 text-blue-600'>Welcome Back</div>
                    <div className='flex flex-col'>
                        <div class="flex mt-3">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </span>
                            <input type="text" class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="Email or username" autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div class="flex mt-1">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                                </svg>

                            </span>
                            <input type="password" class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-min text-sm border-gray-300 p-2.5" placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className='p-2.5 mt-1 rounded-lg bg-gray-50 border text-gray-900 hover:bg-blue-500 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-min text-sm border-gray-300 font-semibold'
                            onClick={handleLogin}
                        >Log In</button>
                    </div>
                    <div className='mt-4 font-bold cursor-pointer' onClick={() => navigate('/signup')}>New User? <span className='text-blue-500 font-bold'

                    >SignUp instead</span></div>
                </div>
            </div>
            <ToastContainer position="top-right" theme="light" autoClose={5000} />
        </>
    )
}

export default LoginPage
