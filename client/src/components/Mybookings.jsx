import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/Appcontext';
import toast from 'react-hot-toast';

function MyBookings() {
  const { token ,user} = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(token); // اطبعه للتأكد,

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`/api/booking/my-bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data.bookings);
      } catch (error) {
          toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-16 lg:px-24 py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">You have no bookings yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-xl shadow hover:shadow-lg transition">
              <img
                src={booking.car.image}
                alt={booking.car.brand}
                className="w-full h-52 object-cover rounded-t-xl"
              />
              <div className="p-5 space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    {booking.car.brand} {booking.car.model}
                  </h2>
                  <span className="text-blue-600 font-semibold">
                    ${booking.totalPrice}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{booking.car.category}</p>
                <p className="text-sm text-gray-500">
                  {new Date(booking.pickupDate).toLocaleDateString()} →{" "}
                  {new Date(booking.returnDate).toLocaleDateString()}
                </p>
                <span className="inline-block px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
