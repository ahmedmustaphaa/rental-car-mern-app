import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

function CarCard({ car, index }) {
  const nav = useNavigate();

 
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      onClick={() => {
        nav(`car/${car._id}`);
        scroll(0, 0);
      }}
      className="relative w-[340px] min-h-[400px] bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}} // نفذ الأنيميشن فقط إذا العنصر ظهر
      transition={{ delay: index * 0.1, duration: 0.6, type: 'spring' }}
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={car.image}
        alt={car.brand}
        className="h-[200px] w-full object-cover rounded-t-2xl"
      />

      <div className="p-5">
        <h2 className="text-[24px] font-bold text-gray-900">{car.brand}</h2>
        <p className="text-[16px] text-gray-600 mb-3">
          {car.category} • {car.year}
        </p>

        <div className="flex justify-between text-sm text-gray-500">
          <div>
            <p>4 seats</p>
            <p>{car.transmission}</p>
          </div>
          <div>
            <p>{car.fuel_type}</p>
            <p>{car.location}</p>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        className="absolute top-4 left-4 bg-[#1562FC] text-white text-xs px-4 py-1 rounded-full shadow"
      >
        Available Now
      </motion.button>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="absolute top-[160px] right-4 bg-black text-white text-lg font-semibold px-6 py-2 rounded-xl"
      >
        {car.pricePerDay}
        <span className="text-gray-400 text-sm font-normal"> /day</span>
      </motion.div>
    </motion.div>
  );
}

export default CarCard;
