import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/Appcontext';
import CarCard from '../components/CarCard';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function Featured() {
  const nav = useNavigate();
  const { cars } = useAppContext();

  // مراقبة العنصر عند الظهور
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  // أنيميشن للعناصر
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.15, duration: 0.6 },
    }),
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="w-[90%] mx-auto" ref={ref}>
        {/* العنوان والوصف */}
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
        >
          <h1 className="text-[40px] font-semibold text-[#414141]">Featured Vehicles</h1>
          <p className="text-[#414141cc] text-[16px]">
            Explore our selection of premium vehicles available for your next adventure.
          </p>
        </motion.div>

        {/* الكروت */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {cars.slice(0, 6).map((car, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={index + 1}
            >
              <CarCard car={car} index={index} />
            </motion.div>
          ))}
        </div>

        {/* زر See More */}
        <motion.div
          className="text-center mt-12"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={7}
        >
          <button
            onClick={() => {
              nav('/cars');
              window.scrollTo(0, 0);
            }}
            className="bg-[#1562FC] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
          >
            See More Cars
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Featured;
