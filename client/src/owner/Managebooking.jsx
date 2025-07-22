import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/Appcontext';

function Managebooking() {
  const [booking, setBooking] = useState([]);
  const { token } = useAppContext();

  const fetchOwnerBooking = async () => {
    try {
      const { data } = await axios.get(`/api/booking/owner`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        setBooking(data.bookings);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.put(
        `/api/booking/status`,
        { bookingId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchOwnerBooking();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchOwnerBooking();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-[#F1F5F9] min-h-screen">
      <h2 className="text-2xl font-semibold mb-2">Manage Bookings</h2>
      <p className="text-sm text-gray-500 mb-4">
        View, confirm, complete, or cancel bookings made by users.
      </p>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-md shadow border bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4">Car</th>
              <th className="p-4">Booked By</th>
              <th className="p-4">Dates</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((booking) => (
              <tr
                key={booking._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={booking.car.image}
                    alt={booking.car.model}
                    className="w-14 h-14 rounded object-cover"
                  />
                  <div>
                    <p className="font-semibold">
                      {booking.car.brand} {booking.car.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {booking.car.seating_capacity} seats • {booking.car.transmission}
                    </p>
                  </div>
                </td>
                <td className="p-4 text-gray-700">{booking.user}</td>
                <td className="p-4 text-gray-700">
                  <p className="text-xs">
                    From: {new Date(booking.pickupDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs">
                    To: {new Date(booking.returnDate).toLocaleDateString()}
                  </p>
                </td>
                <td className="p-4">${booking.price}</td>
                <td className="p-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : booking.status === 'completed'
                        ? 'bg-blue-100 text-blue-700'
                        : booking.status === 'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  {booking.status === 'pending' && (
                    <button
                      onClick={() => changeBookingStatus(booking._id, 'confirmed')}
                      className="text-green-600 hover:text-green-800 text-xs font-medium"
                    >
                      Confirm
                    </button>
                  )}
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => changeBookingStatus(booking._id, 'completed')}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                    >
                      Complete
                    </button>
                  )}
                  {booking.status !== 'cancelled' && (
                    <button
                      onClick={() => changeBookingStatus(booking._id, 'cancelled')}
                      className="text-red-600 hover:text-red-800 text-xs font-medium"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 mt-4">
        {booking.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-xl shadow border p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={booking.car.image}
                alt={booking.car.model}
                className="w-16 h-16 rounded object-cover"
              />
              <div>
                <p className="font-semibold text-base">
                  {booking.car.brand} {booking.car.model}
                </p>
                <p className="text-xs text-gray-500">
                  {booking.car.seating_capacity} seats • {booking.car.transmission}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-1">
              <strong>User:</strong> {booking.user}
            </p>

            <p className="text-sm text-gray-700 mb-1">
              <strong>Pickup:</strong>{' '}
              {new Date(booking.pickupDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Return:</strong>{' '}
              {new Date(booking.returnDate).toLocaleDateString()}
            </p>

            <p className="text-sm text-gray-700 mb-2">
              <strong>Price:</strong> ${booking.price}
            </p>

            <div className="mb-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  booking.status === 'confirmed'
                    ? 'bg-green-100 text-green-700'
                    : booking.status === 'completed'
                    ? 'bg-blue-100 text-blue-700'
                    : booking.status === 'cancelled'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {booking.status}
              </span>
            </div>

            <div className="flex gap-3 flex-wrap">
              {booking.status === 'pending' && (
                <button
                  onClick={() => changeBookingStatus(booking._id, 'confirmed')}
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Confirm
                </button>
              )}
              {booking.status === 'confirmed' && (
                <button
                  onClick={() => changeBookingStatus(booking._id, 'completed')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Complete
                </button>
              )}
              {booking.status !== 'cancelled' && (
                <button
                  onClick={() => changeBookingStatus(booking._id, 'cancelled')}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Managebooking;
