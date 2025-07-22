import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { assets, dummyUserData, ownerMenuLinks } from '../../assets/assets';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/Appcontext';

function Sidebar() {
  const {user} = useAppContext()
  console.log(user.name)
  const location = useLocation();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className=" h-screen w-full bg-white shadow-xl p-6 flex flex-col items-center">
      {/* Brand */}
      <div className="flex items-center mb-8">
     
        <h1 className="text-2xl font-bold text-gray-800 hidden md:block">CarRental</h1>
      </div>

      {/* Profile Image */}
      <div className="relative mb-4">
        <label htmlFor="upload" className="cursor-pointer">
          <img
            src={'/ahmed.jpg'}
            alt="Profile"
            className="hidden md:block w-20 h-20 rounded-full border-4 border-purple-500 object-cover transition hover:opacity-80"
          />
        </label>
        <input
          id="upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Name */}
      <h2 className="text-lg font-semibold text-gray-700 mb-6 hidden md:block">{user.name}</h2>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2 w-full">
        {ownerMenuLinks.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition relative group ${
                isActive
                  ? 'bg-purple-100 text-purple-600 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => navigate(item.path)}
            >
              {/* Highlight bar on right */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-0 h-8 w-1 bg-[#4C88FF] rounded-l-full"
                />
              )}

              <img
                src={ item.coloredIcon }
                alt={item.name}
                className="w-5 h-5"
              />
              <span className='hidden md:block'> {item.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
