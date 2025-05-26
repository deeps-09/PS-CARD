import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
    return (
        <div>
            <div className='text-center text-2xl pt-10 text-gray-500'>
                <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-12'>
                <img className='newshadow w-full md:max-w-[360px] rounded' src={assets.about_image} alt='' />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
                    <p>Welcome to PS-Card, a revolutionary platform designed to streamline healthcare management and empower patients to take control of their health journey. Our mission is to make healthcare more accessible, transparent, and organized, by providing you with a secure and easy-to-use digital smart card that stores all your vital medical information in one place.</p>
                    <p>With Patient Smart Card, you can effortlessly book appointments with trusted doctors, track your past medical treatments, and keep a detailed record of your prescribed medications. No more scattered paperwork or forgotten visits – everything you need is available at your fingertips. Whether you’re managing a chronic condition, coordinating care with multiple specialists, or simply keeping track of your wellness, Patient Smart Card ensures that your health data is always up-to-date and accessible when you need it.</p>
                    <b className='text-gray-600'>OUR VISION</b>
                    <p>Our platform is designed with your privacy and convenience in mind, offering a safe and reliable space to view your medical history, manage appointments, and communicate directly with healthcare providers. Join the growing community of patients who trust Patient Smart Card to simplify their healthcare experience and focus on what matters most—your health.</p>
                </div>
            </div>

            <div className='text-xl my-4'>
                <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
            </div>

            <div className='flex flex-col md:flex-row mb-20 font-semibold'>
                <div className='shadow border m-2 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-xl'>
                    <b> Efficiency:</b>
                    <p>Streamlined Appointment Schdeuling <br/>That Fits Into Your Busy Life</p>
                </div>

                <div className='shadow border m-2 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-xl'>
                    <b>Convenience:</b>
                    <p>Access To A Network Of Trusted Healthcare Professionals In Your Area</p>
                </div>

                <div className='shadow border m-2 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-xl'>
                    <b>Personalization:</b>
                    <p>Tailord Recommendations And Remainders To Help You Stay On Top Of Your Health</p>
                </div>
            </div>
        </div>
    )
}

export default About