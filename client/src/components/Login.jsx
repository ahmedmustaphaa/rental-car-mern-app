import React, { useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';

function Login({ openLogin, setOpenLogin }) {
  const [state, setState] = useState({ name: '', email: '', password: '' });
  const [login, setLogin] = useState(true);
  const { authUser } = useAppContext();

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    authUser(login ? 'login' : 'register', state);
    setOpenLogin(false);
  };

  if (!openLogin) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={() => setOpenLogin(false)}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.3 }}
        className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white w-[90%] max-w-md p-8 rounded-2xl shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {login ? 'Welcome Back ' : 'Create Account '}
          </h2>
          <button onClick={() => setOpenLogin(false)}>
            <MdClose size={22} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {!login && (
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="eng ahmed"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="ahmed@email.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-2 rounded-lg font-semibold"
          >
            {login ? 'Login' : 'Register'}
          </button>

          <p className="text-center text-sm text-gray-600">
            {login ? 'Don’t have an account?' : 'Already have an account?'}{' '}
            <span
              onClick={() => setLogin(!login)}
              className="text-indigo-600 font-medium cursor-pointer hover:underline"
            >
              {login ? 'Register' : 'Login'}
            </span>
          </p>
        </form>
      </motion.div>
    </>
  );
}

export default Login;
