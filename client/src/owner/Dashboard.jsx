import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/Appcontext';
import toast from 'react-hot-toast';
import { FaCarSide, FaUsers, FaChartLine, FaClock } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';

function Dashboard() {
  const { token } = useAppContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const res = await axios.get(`/api/owner/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data.data);
      } catch (err) {
        toast.error('فشل تحميل بيانات لوحة التحكم');
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <ClipLoader size={50} color="#2563eb" />
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Cars',
      value: data?.totalCars || 0,
      icon: <FaCarSide className="text-blue-600" size={24} />,
    },
    {
      title: 'Available Cars',
      value: data?.availableCars || 0,
      icon: <FaClock className="text-green-600" size={24} />,
    },
    {
      title: 'My Cars',
      value: data?.myCars || 0,
      icon: <FaCarSide className="text-purple-600" size={24} />,
    },
    {
      title: 'Total Users',
      value: data?.totalUsers || 0,
      icon: <FaUsers className="text-orange-600" size={24} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome to your admin panel</p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-full">
                {item.icon}
              </div>
              <div>
                <h4 className="text-gray-600 text-sm">{item.title}</h4>
                <p className="text-xl font-semibold text-gray-800">
                  {item.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Section */}
      <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Monthly Revenue</h2>
          <FaChartLine className="text-green-600" size={24} />
        </div>
        <p className="text-sm text-gray-500 mb-2">Total earnings this month:</p>
        <p className="text-4xl font-bold text-green-600">${data?.monthlyRevenue || 0}</p>
        <p className="text-xs text-gray-400 mt-2">
          Updated automatically based on bookings.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
