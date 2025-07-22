import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/Appcontext';
import axios from 'axios';
import toast from 'react-hot-toast';

function CarDetails() {
  const { details } = useParams();
  const [CarDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  const {
    cars,
    pickupDate,
    returnDate,
    setPickupDate,
    setReturnDate,
    token,
  } = useAppContext();

  useEffect(() => {
    setLoading(true);
    const data = cars.find((car) => car._id === details);
    setTimeout(() => {
      setCarDetails(data);
      setLoading(false);
    }, 1000);
  }, [details, cars]);

  const handleBooking = async () => {
    if (!pickupDate || !returnDate) {
      return alert('Please select pickup and return dates');
    }

    try {
      setLoading(true);
      setError('');

      await axios.post(
        'http://localhost:5000/api/booking/create',
        {
          carId: CarDetails._id,
          pickupDate,
          returnDate,
          owner: CarDetails.owner,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Booking successful!');
      nav('/my-bookings');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (!CarDetails) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        Car not found. Please go back and try again.
      </div>
    );
  }

  return (
    <div className="bg-[#F1F5F9] min-h-screen">
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 pt-24 pb-16 max-w-[1400px] mx-auto">
        {/* Back button */}
        <button
          onClick={() => nav(-1)}
          className="text-blue-600 hover:underline mb-6 text-sm sm:text-base"
        >
          ← Back to all cars
        </button>

        {/* Main car content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Left side */}
          <div className="lg:col-span-2 space-y-6">
            <img
              src={CarDetails.image}
              alt={CarDetails.brand}
              className="w-full rounded-xl object-cover h-[240px] sm:h-[320px] md:h-[400px] lg:h-[460px]"
            />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase">
              {CarDetails.brand}
            </h1>
            <p className="text-base md:text-lg text-gray-500">
              {CarDetails.category}
            </p>

            <div className="flex flex-wrap gap-3 text-sm sm:text-base text-gray-700">
              <span className="bg-gray-100 px-3 py-1 rounded-lg">
                {CarDetails.transmission}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-lg">
                {CarDetails.fuel_type}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-lg">
                {CarDetails.seating_capacity} Seats
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-lg">
                {CarDetails.category}
              </span>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">Description</h2>
              <p className="text-gray-600 text-sm sm:text-base">{CarDetails.description}</p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">Features</h2>
              <ul className="grid grid-cols-2 gap-2 text-gray-700 list-disc list-inside text-sm sm:text-base">
                <li>360 Camera</li>
                <li>GPS</li>
                <li>Rear View Mirror</li>
                <li>Bluetooth</li>
                <li>Heated Seats</li>
              </ul>
            </div>
          </div>

          {/* Right side */}
          <div>
            <div className="bg-white shadow-md rounded-xl p-5 sm:p-6 border border-gray-200 sticky top-24">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                ${CarDetails.price_per_day || 300}
                <span className="text-gray-500 text-sm font-normal"> / per day</span>
              </h2>

              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1">Pickup Date</label>
                <input
                  type="date"
                  className="w-full border p-2 rounded-md text-gray-700 outline-none text-sm"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1">Return Date</label>
                <input
                  type="date"
                  className="w-full border p-2 rounded-md text-gray-700 outline-none text-sm"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm mb-2">{error}</div>
              )}

              <button
                onClick={handleBooking}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-sm sm:text-base transition duration-200"
              >
                {loading ? 'Booking...' : 'Book Now'}
              </button>

              <p className="text-xs text-gray-400 mt-3 text-center">
                No credit card required to reserve
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
