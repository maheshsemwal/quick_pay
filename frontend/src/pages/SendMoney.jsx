import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom';
import ImageComp from '../components/ImageComp';
import { useRecoilValue } from 'recoil';
import { loggedInUser } from '../store/atom/atoms';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendMoney = () => {
    const navigate = useNavigate()
    const user = useRecoilValue(loggedInUser)
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const profileUrl = searchParams.get("profileUrl");
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    function validateNumberInput(event) {
        // Remove non-numeric characters and leading zeros
        let value = event.target.value.replace(/[^0-9.]/g, '').replace(/^0+(\d)/, '$1');

        // Limit to two decimal points
        const parts = value.split('.');
        if (parts.length > 1) {
            value = parts[0] + '.' + parts[1].slice(0, 2);
        }

        // Update the state with the validated value
        setAmount(value);
    }

    const transfer = async () => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            }
            console.log("request Goes")
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/account/transfer`, {
                userId: user._id,
                to: id,
                amount
            }, config)
            if(response){
                navigate("/success")
                setLoading(false)
            }
        }
         catch (e) {
            toast.error(e.response.data.msg)
            setLoading(false)
        }
    }

    return (
        <>
        <div className='grid place-content-center items-center h-full text-center bg-white'>
            <div className='bg-blue-300 p-14 rounded-3xl'>

                <div className='text-4xl font-bold mt-4 mb-10'>Send Money</div>
                <div className='flex items-center mb-5'>
                    <ImageComp imageUrl={profileUrl} />
                    <div className='ml-5 text-4xl font-bold'>{name}</div>
                </div>
                <div>
                    <div className="relative h-11 mb-5">
                        <input
                            type='text'
                            value={amount}
                            onChange={(e) => validateNumberInput(e)}
                            placeholder=""
                            className="text-center peer h-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-xl font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                        <label
                            className="pointer-events-none absolute left-0 -top-1.5 flex h-full  select-none !overflow-visible truncate text-xl font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-lg peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-lg peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Amount (in RS)
                        </label>
                    </div>
                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={transfer}
                    >Send Money</button>
                </div>
            </div>
        </div>
        <ToastContainer position="top-right" theme="light" autoClose={5000} />
                            </>
    );
}

export default SendMoney;
