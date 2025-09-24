import React from 'react'
import { assets } from "../../assets/assets_frontend/assets"

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
        {/* left Section */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:h-2/3 text-gray-600 leading-6 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed fuga labore placeat voluptates maxime eveniet, hic corrupti odit, quia nam ea numquam repellendus, amet ex incidunt adipisci maiores odio vel.</p>
        </div>
        {/* Centre Section */}
        <div>
          <p className='text-xl font-medium mb-5'>Compony</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About Us </li>
            <li>Contact Us </li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* Right Section */}
        <div>
          <p className='text-xl font-medium mb-5'>Get In Touch</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>6576768776876</li>
            <li>jdfhdgf@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        {/* Copyright Text */}
        <hr />
        <p className='py-5 text-sm text-center'>Copyrigt Lorem ipsum dolor sit amet consectetur.</p>
      </div>
    </div>
  )
}

export default Footer
