import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { assets } from '../assets/assets';

function Newsletter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, type: 'spring' }}
      className="md:grid md:grid-cols-2  max-w-4xl bg-white mx-4 md:mx-auto my-16 rounded-xl shadow-md overflow-hidden"
    >
      {/* Left image */}
      <motion.img
        src={'ahmed.jpg'}
        alt="Newsletter"
        className="block w-full h-[450px] object-cover"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Right content */}
      <div className="relative flex items-center justify-center p-8 md:p-10">
        <button className="absolute top-6 right-6" aria-label="Close">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 2 2 13M2 2l11 11"
              stroke="#1F2937"
              strokeOpacity=".7"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="w-full text-center">
          <motion.h1
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Subscribe to our newsletter
          </motion.h1>

          <motion.p
            className="mt-4 text-gray-500"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Be the first to get the latest news about trends, promotions, and much more!
          </motion.p>

          <motion.form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              className="w-full sm:w-[70%] p-4 rounded-md sm:rounded-l-md border border-gray-300 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition text-white px-7 py-3 rounded-md sm:rounded-r-md"
            >
              Submit
            </button>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
}

export default Newsletter;
