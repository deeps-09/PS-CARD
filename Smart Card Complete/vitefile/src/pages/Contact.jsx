import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {

  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold '>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='headshadow border-white rounded-lg bg-blue-900 p-6 my-10 flex flex-col  md:flex-row gap-10 mb-28 text-sm'>
        <img className='shadow rounded w-full h-full max-h-[500px] max-w-[300px]' src={assets.contact_image} alt='' />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-bold tracking-widest text-lg text-white'>OUR OFFICE </p>
          <p className='text-white'>9/107 SHBK ROAD <br /> DUMDUM, KOLKATA-04</p>
          <p className='text-white'>Tel: 9870173699<br />Email: pscardofficial@gmail.com</p>
          <p className='font-bold tracking-widest text-lg text-white'>CAREERS AT PS-CARD </p>
          <p className='text-white'>Learn more about our teams & job openings.</p>
          <button className='bg-gray-300 text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full ro-full mt-3 hover:scale-105 transition-all cursor-pointer'>Explore Jobs</button>
        </div>

        <div className='flex flex-col'>
          <img className='w-full rounded-lg pl-40' src='/images/logo.png' alt='' />
          <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white pl-40 mt-10'>JOIN US NOW</div>
        </div>
      </div>
    </div>
  )
}
export default Contact