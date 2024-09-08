import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loggedInUser } from '../store/atom/atoms';
import axios from 'axios';
import UserlList from './UserlList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GetAllUsers = () => {
    const user = useRecoilValue(loggedInUser);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    let timeout;

    function debounce(val) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            setSearch(val);
        }, 500);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user?search=${search}`, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
                setUsers(data);
                setLoading(false);
            } catch (e) {
                toast.error(`${e.message}`);
                setLoading(false);
            }  
        };

        if (search !== '') {
            fetchUsers();
        } else {
            setUsers([]);
        }

        return () => clearTimeout(timeout); // Cleanup function to clear timeout
    }, [search, user.token]);

    return (
    <>
        <div className='mt-10'>
            <div className="relative h-11 w-full min-w-[200px]">
                <input placeholder=""
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-xl font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                    onChange={(e) => debounce(e.target.value)}
                />
                <label
                    className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-xl font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-lg peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-lg peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                   Search By Name or Email
                </label>
            </div>
        </div>
        {users.map(user => <UserlList user={user} key={user._id}/>)}
        <ToastContainer position="top-right" theme="light" autoClose={5000} />
    </>
    );
};




export default GetAllUsers;
