import React from 'react'
import { assets, dummyUserData } from '../../assets/assets'
import { Link } from 'react-router-dom';

function Navbar() {

    const user=dummyUserData;
  return (
    <div className=' flex py-4 items-center justify-between px-6 md:px-10 text-gray-400 border-b border-gray-200 relative transition-all '>
          <Link to=''>
          <img src={assets.logo} alt="" />
          </Link>
          <p>welcome ahmed mustafa</p>
    </div>
  )
}

export default Navbar
