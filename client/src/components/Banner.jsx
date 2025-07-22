import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
function Banner() {
  return (
    <motion.div className="w-[90%] mx-auto my-12 px-6 sm:px-12 py-10 bg-gradient-to-r
     from-[#0558FE] to-[#A9CFFF] rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8"
          initial={{opacity:0 ,y:50}}
          whileInView={{opacity:1, y:0}}
          transition={{duration:0.6}}
     >

     
      <div className="flex-1 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Do You Own a Luxury Car?
        </h1>
        <p className="text-sm sm:text-base mb-6 leading-relaxed text-white/90">
          Monetize your vehicle effortlessly by listing it on CarRental. <br />
          We take care of insurance, driver verification, and secure payments —<br />
          so you can earn passive income, stress-free.
        </p>
        <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}}  className="bg-white text-[#0558FE] font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
          List Your Car
        </motion.button>
      </div>

      {/* Image */}
      <div className="flex-1 flex justify-center">
        <motion.img
        initial={{opacity:0 ,x:50}}
        whileInView={{opacity:1,x:0}}

        transition={{duration:0.6 ,delay:0.6}}
          src={assets.banner_car_image}
          alt="Luxury Car"
          className="h-[180px] sm:h-[200px] md:h-[220px] object-contain"
        />
      </div>
    </motion.div>
  );
}

export default Banner;
