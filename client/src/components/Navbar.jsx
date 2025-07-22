// Updated Navbar with Framer Motion and professional design

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets, menuLinks } from '../assets/assets';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAppContext } from '../context/Appcontext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

function Navbar({ openLogin, setOpenLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut, token, owner } = useAppContext();
  const navigate = useNavigate();

  const changeRoleToOwner = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/owner/change-role`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) toast.success(data.message);
    } catch (error) {
      console.error("Error changing role:", error);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full md:py-4 bg-[#F1F5F9] shadow z-50 border-b border-gray-200  top-0 left-0 right-0'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link to='/'>
            <img src={assets.logo} alt='Logo' className='h-8' />
          </Link>

          {/* Desktop Menu */}
          <nav className='hidden md:flex items-center gap-6'>
            {menuLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className='text-gray-700 hover:text-blue-600 font-medium transition duration-200'
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Desktop */}
          <div className='hidden md:flex items-center gap-4'>
            <div className='flex items-center border border-gray-300 rounded-full px-4 py-2 w-[250px]'>
              <input
                type='text'
                placeholder='Search Cars'
                className='outline-none text-sm w-full'
              />
              <img src={assets.search_icon} alt='search' className='w-4 h-4 ml-2' />
            </div>

           

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className='bg-teal-600 px-4 py-2 rounded-2xl text-white shadow-sm'
              onClick={() => owner ? navigate('/owner') : changeRoleToOwner()}
            >
              {owner ? "Dashboard" : "List Cars"}


            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => user ? logOut() : setOpenLogin(!openLogin)}
              className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-full transition duration-300'
            >
              {user ? 'Logout' : 'Sign Up'}
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-700 hover:text-blue-600 focus:outline-none'
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-In Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className='md:hidden fixed top-16 right-0 h-[calc(100vh-64px)] w-64 bg-white border-l border-gray-200 px-6 py-4 shadow-lg z-40'
          >
            <nav className='flex flex-col gap-4'>
              {menuLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className='text-gray-700 hover:text-blue-600 font-medium'
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className='mt-6 flex flex-col gap-3'>
               


                {user?.role === 'user' && (
                  <button
                    className='bg-teal-600 px-4 py-2 rounded-2xl text-white text-left'
                    onClick={() => {
                      navigate('/owner');
                      setIsOpen(false);
                    }}
                  >
                    Dashboard
                  </button>
                )}

                <button
                  onClick={() => {
                    user ? logOut() : setOpenLogin(!openLogin);
                    setIsOpen(false);
                  }}
                  className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full flex items-center justify-center transition duration-300 text-left'
                >
                  {user ? 'Logout' : 'Sign Up'}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
