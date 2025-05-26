import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='headshadow flex flex-col md:flex-row flex-wrap bg-blue-700 rounded-lg md:px-10 lg:px-20'>
            {/* ---------left side------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    Book Apoointment <br /> With Trusted Doctors
                </p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                    <img className='' src={assets.group_profiles} alt='group logo' />

                    <p>
                        Simply browse through our extensive list of trusted doctors,<br /> schdeule your appointment for free
                    </p>
                </div>
                <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                    Book Apoointment <img className='w-3' src={assets.arrow_icon} alt="" />
                </a>


            </div>
            {/* --------right side--------- */}
            <div className='md:w-1/2 relative'>
                <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt='header image' />
            </div>
        </div>
    )
}

export default Header