import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className='shadow md:mx:10 bg-fuchsia-600 rounded mb-6'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mx-4 my-4 mt-10 text-sm'>
                {/* -----left sectiion----- */}
                <div className='mt-4'>
                    <img onClick={()=>{navigate('/'); scrollTo(0,0)}} className='w-35 h-16 rounded cursor-pointer' src='/images/logo.png' alt='logo' />
                    <p className='mt-4 w-full md:w-2/3 text-white font-semibold trackind-wide leading-6'>Patient Smart Card is dedicated to revolutionizing healthcare access and management with secure and easy-to-use digital health cards. Empowering patients to access medical information, track treatments, and connect with healthcare providers effortlessly.</p>
                </div>

                {/* -----center sectiion----- */}
                <div className='mt-4'>
                    <p className='text-xl text-black-900 lg:text-3xl mb-4'>PS-CARD</p>
                    <ul className='flex flex-col gap-2 text-white pl-1'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* -----right sectiion----- */}
                <div className='mt-4'>
                    <p className='text-xl text-black-900 lg:text-3xl mb-4'>GET IN TOUCH </p>
                    <ul className='flex flex-col gap-2 text-white pl-1'>
                        <li>Call us : <span>9876125679</span></li>
                        <li>pscardofficial@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* -----copy right section------ */}
            <div>
                <p className='py-5 text-sm tracking-wide text-white text-center'>Copyright 2025@ PS-CARD - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer