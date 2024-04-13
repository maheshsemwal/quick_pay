import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='flex justify-between  pl-10 pr-10 pt-6 pb-6 bg-indigo-100'>
                <h1 className='text-3xl text-indigo-600 font-semibold italic md:text-5xl'>Quick <span className=' text-black'>Pay</span></h1>
                <button onClick={()=> navigate('/login')}
                    className=" py-1 text-indigo-600 font-medium bg-indigo-50  inline-flex items-center px-3  duration-100 border rounded-lg hover:border-indigo-600 hover:bg-indigo-200 active:shadow-lg sm:py-2 sm:px-5 "
                 >
                    Get Started
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                </button>
            </div>
            <section className="relative max-w-screen-xl mx-auto pt-20 py-4 px-4 md:px-8">
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-40"></div>
                <div className="relative z-10 gap-5 items-center lg:flex">
                    <div className="text-center flex-1 max-w-lg py-5 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
                        <h3 className="text-3xl text-gray-800 font-semibold italic md:text-6xl">
                            Fast, Safe Social <span className="text-indigo-600">payments</span>
                        </h3>
                        <p className="text-gray-500 leading-relaxed mt-3">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim id mollitia provident expedita. Ab quaerat reiciendis architecto tempora cum, aliquid quis autem voluptatum modi, doloribus obcaecati alias vitae ducimus debitis.
                        </p>
                        <a
                            className="mt-5 px-4 py-2 text-indigo-600 font-medium bg-indigo-50 rounded-full inline-flex items-center hover:bg-indigo-300 ease-in-out duration-5s"
                            onClick={()=> navigate('/login')}>
                            Get Started
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </div>
                    <div className="flex-1 mt-5 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto">
                        <img
                            src="https://i.postimg.cc/kgd4WhyS/container.png"
                            alt=""
                            className="w-full"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default LandingPage
