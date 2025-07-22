import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/Appcontext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

function Hero() {
  const [selected, setSelected] = useState('New York');
  const { pickupDate, returnDate, setPickupDate, setReturnDate } = useAppContext();

  const [availableCars, setAvailableCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/cars?selected=${selected}&pickupDate=${pickupDate}&returnDate=${returnDate}`);
  };

  return (
    <motion.div
      className="w-[90%] mx-auto pt-[40px] min-h-screen flex flex-col items-center justify-start"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      <motion.h1
        className="font-bold text-[#414141] text-3xl sm:text-4xl lg:text-[50px] text-center leading-tight"
        custom={0}
        variants={fadeUp}
      >
        Luxury Cars on Rent
      </motion.h1>

      <motion.form
        onSubmit={handleSearch}
        className="mt-10 bg-[white] w-full max-w-[1000px] py-6 px-6 sm:px-10 rounded-3xl sm:rounded-full shadow-xl shadow-[#0000001A] flex flex-col sm:flex-wrap sm:flex-row items-center justify-between gap-6"
        custom={1}
        variants={fadeUp}
      >
        {[
          {
            label: 'Pickup Location',
            type: 'select',
            value: selected,
            onChange: (e) => setSelected(e.target.value),
            options: ['New York', 'Los Angeles', 'Houston', 'Chicago'],
          },
          {
            label: 'Pick-up Date',
            type: 'date',
            value: pickupDate,
            onChange: (e) => setPickupDate(e.target.value),
          },
          {
            label: 'Return Date',
            type: 'date',
            value: returnDate,
            onChange: (e) => setReturnDate(e.target.value),
          },
        ].map((field, index) => (
          <motion.div
            key={index}
            className="flex flex-col gap-2 w-full sm:w-[45%] md:w-[23%]"
            custom={index + 2}
            variants={fadeUp}
          >
            <label className="text-gray-700 font-semibold">{field.label}</label>
            {field.type === 'select' ? (
              <select
                value={field.value}
                onChange={field.onChange}
                className="p-3 rounded-lg border border-gray-300 text-gray-800 font-medium focus:outline-blue-500"
              >
                {field.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={field.value}
                onChange={field.onChange}
                className="p-3 rounded-lg border border-gray-300 text-gray-800 font-medium focus:outline-blue-500"
              />
            )}
          </motion.div>
        ))}

        <motion.div
          className="flex flex-col gap-2 w-full sm:w-[45%] md:w-[23%]"
          custom={5}
          variants={fadeUp}
        >
          <label className="text-white hidden">Search</label>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 w-full"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </motion.div>
      </motion.form>

      {error && (
        <motion.p
          className="mt-6 text-red-500"
          custom={6}
          variants={fadeUp}
        >
          {error}
        </motion.p>
      )}

      {availableCars.length > 0 && (
        <motion.div
          className="mt-10 w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-6"
          custom={7}
          variants={fadeUp}
        >
          {availableCars.map((car) => (
            <div key={car._id} className="p-4 border rounded-lg shadow">
              <img src={car.image} alt={car.brand} className="w-full h-48 object-cover rounded" />
              <h3 className="text-xl font-bold mt-3">{car.brand}</h3>
              <p className="text-gray-600">Rent: ${car.rentPerDay} / day</p>
            </div>
          ))}
        </motion.div>
      )}

      <motion.img
        src={assets.main_car}
        alt="Main Car"
        className="mt-6 w-full max-w-[800px] px-4 sm:px-0"
        custom={8}
        variants={fadeUp}
      />
    </motion.div>
  );
}

export default Hero;
