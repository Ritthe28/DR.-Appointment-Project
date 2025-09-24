import React from 'react'
import { assets } from '../../assets/assets_frontend/assets'

const About = () => {
  return (
    <div> <div className='text-center text-2xl pt-10 text-gray-500'>

      <p>About  <span className='text-gray-700 font-medium'>US</span></p>
    </div>
      <div className='my-10 flex flex-col md:flex-row gap-12 '>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia voluptatibus, vel repellat adipisci excepturi doloribus impedit amet natus necessitatibus laudantium? Sit illum minima asperiores minus itaque facilis nobis fugiat quos.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum amet dolore fuga ut perspiciatis ea quibusdam voluptatum laboriosam quod assumenda, quasi eligendi quas aliquid inventore aspernatur ipsum eveniet nemo eaque. Provident adipisci consectetur labore quidem.</p>
          <b className='text-gray-800'>our vision</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque et, molestias sapiente ducimus laudantium perspiciatis deleniti tempore iusto ab consectetur tempora quidem eius, ipsa saepe rerum dolorem vero a corporis!</p>
        </div>
      </div>
      <div className='text-xl my-4 '>

        <p>
          WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span>
        </p>
      </div>
      <div className='flex flex-col md:flex-row'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b> Efficiency
          </b>
          <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum, possimus.
          </p></div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'><b> convinience
        </b>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, adipisci?
          </p></div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b> Personalization
          </b>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora, culpa.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
