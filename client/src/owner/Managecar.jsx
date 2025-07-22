import React, { useState, useEffect } from 'react';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { useAppContext } from '../context/Appcontext';
import toast from 'react-hot-toast';
import axios from 'axios';

function Managecar() {
  const { cars, token, setCars } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cars) {
      // مجرد لودينج بسيط عشان نعطي إحساس تحميل
      setTimeout(() => setLoading(false), 800);
    }
  }, [cars]);

  const deleteCar = async (carId) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/owner/delete-car`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { carId },
        }
      );
      setCars((prev) => prev.filter((car) => car._id !== carId));
      if (data.success) toast.success('Car deleted successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const toggleAvailable = async (carId) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/owner/cars/toggle`,
        { carId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setCars((prev) =>
          prev.map((car) =>
            car._id === carId
              ? { ...car, isAvailable: !car.isAvailable }
              : car
          )
        );
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className='bg-[#F1F5F9] h-[100vh]'>
    <div className="p-6 ">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">Manage Cars</h2>
        <p className="text-gray-500 text-sm">
          View, edit availability, or remove listed cars from the system.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <ClipLoader size={45} color="#9333ea" />
        </div>
      ) : cars.length === 0 ? (
        <div className="flex justify-center items-center h-40 text-gray-400 italic">
          No cars added yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow bg-white border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-4 text-left">Car</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {cars.map((car) => (
                <tr key={car._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-14 h-14 rounded-md object-cover shadow"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">
                        {car.brand} {car.model}
                      </div>
                      <div className="text-xs text-gray-500">
                        {car.seating_capacity} seats • {car.transmission}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize">{car.category}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    ${car.pricePerDay}/day
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        car.isAvailable
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {car.isAvailable ? 'Available' : 'Not Available'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      title="Toggle Availability"
                      onClick={() => toggleAvailable(car._id)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <FaEye />
                    </button>
                    <button
                      title="Delete Car"
                      onClick={() => deleteCar(car._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
    
  );
}

export default Managecar;
