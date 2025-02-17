import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-800 text-white py-10'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-6'>
        <div>
          <p className='text-lg font-semibold'>
            &copy; {new Date().getFullYear()} CryptoDevs. All Rights Reserved.
          </p>
          <p className='text-sm mt-2'>
            Bringing innovation to the world of blockchain solutions.
          </p>
        </div>
        <div className='space-x-8'>
          <a href='/terms' className='text-sm hover:text-gray-400'>
            Terms of Service
          </a>
          <a href='/privacy' className='text-sm hover:text-gray-400'>
            Privacy Policy
          </a>
          <a href='/contact' className='text-sm hover:text-gray-400'>
            Contact
          </a>
        </div>
        <div>
          <p className='text-sm text-center'>
            Follow us on social media:
          </p>
          <div className='flex justify-center space-x-4 mt-2'>
            <a href='#' className='text-blue-500 hover:text-blue-400'>
              Facebook
            </a>
            <a href='#' className='text-blue-400 hover:text-blue-300'>
              Twitter
            </a>
            <a href='#' className='text-pink-500 hover:text-pink-400'>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Footer