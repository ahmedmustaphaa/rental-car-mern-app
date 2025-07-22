import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import CarCard from './CarCard';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/Appcontext';
import axios from 'axios';
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';

function Car() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchParams] = useSearchParams();

  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');
  const selected = searchParams.get('selected');

  const { cars } = useAppContext();
  const allCars = Array.isArray(cars) ? cars : [];

  const isSearchData = selected && returnDate && pickupDate;

  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post('/api/booking/check-availability', {
        location: selected,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        setFilteredCars(data.availableCars || []);
      } else {
        toast.error(data.message);
        setFilteredCars([]);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch available cars');
      setFilteredCars([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (isSearchData) {
        await searchCarAvailability();
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000); // simulate loading time
      }
    };
    fetchData();
  }, [pickupDate, returnDate, selected]);

  const carsToDisplay = isSearchData ? filteredCars : allCars;

  const displayedCars = Array.isArray(carsToDisplay)
    ? carsToDisplay.filter((car) => {
        const brandMatch = car.brand?.toLowerCase().includes(input.toLowerCase());
        const modelMatch = car.model?.toLowerCase().includes(input.toLowerCase());
        const featureMatch =
          Array.isArray(car.features) &&
          car.features.some((feature) =>
            feature.toLowerCase().includes(input.toLowerCase())
          );
        return brandMatch || modelMatch || featureMatch;
      })
    : [];

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-[9999]">
        <div className="text-center">
          <ClipLoader color="#1D4ED8" size={60} />
          <p className="mt-4 text-gray-600 text-lg">جارٍ تحميل الصفحة...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F8FAFC]">
      <div className="w-[90%] m-auto">
        <div className="text-center pt-20">
          <h1 className="font-bold text-4xl text-[#111827]">Available Cars</h1>
          <p className="text-gray-500 pt-4 text-lg">
            Browse our selection of premium vehicles available for your next adventure.
          </p>

          <div className="w-full md:w-[60%] m-auto mt-10 px-6 py-3 flex items-center justify-between border border-gray-300 rounded-full bg-white shadow-sm">
            <div className="flex items-center gap-4 w-full">
              <img src={assets.arrow_icon} alt="arrow" className="w-6 h-6" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full outline-none placeholder:text-base text-gray-700"
                placeholder="Search by make, model, or features"
              />
            </div>
            <img src={assets.filter_icon} alt="filter" className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="mt-20 px-4 md:px-16">
        <h2 className="text-gray-700 text-xl font-semibold mb-6">
          Showing {displayedCars.length} cars
        </h2>

        {displayedCars.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No cars found.</p>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {displayedCars.map((car, index) => (
              <CarCard key={index} car={car} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Car;
