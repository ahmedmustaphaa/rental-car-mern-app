import React, { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import Car from './components/Car'
import CarDetails from './components/CarDetails'
import Footer from './components/Footer'
import Mybookings from './components/Mybookings'
import Layout from './owner/Layout'
import Dashboard from './owner/Dashboard'
import Addcar from './owner/Addcar'
import Managecar from './owner/Managecar'
import Managebooking from './owner/Managebooking'
import { Toaster } from 'react-hot-toast';
function App() {
  const [openLogin, setOpenLogin] = useState(false)

  const location = useLocation()
  const isOwner = location.pathname.startsWith('/owner')

  return (
    <div>
    <div>
         <Toaster position="top-center" reverseOrder={false} />
      {!isOwner && <Navbar openLogin={openLogin} setOpenLogin={setOpenLogin} />}

    
        <Routes>
          <Route path='/' element={<Home />} />
          
          <Route path='/cars' element={<Car />} />
          <Route path='/car/:details' element={<CarDetails />} />
          <Route path='/my-bookings' element={<Mybookings />} />
          <Route path='/owner' element={<Layout/>}>
          <Route index element={<Dashboard/>}></Route>
          <Route path='add-car' element={<Addcar/>}></Route>
          <Route path='manage-cars' element={<Managecar/>}></Route>
          <Route path='manage-bookings' element={<Managebooking/>}></Route>
          
          </Route>
          
        </Routes>

 

  
      {/* Login Modal */}
      <Login openLogin={openLogin} setOpenLogin={setOpenLogin} />
    </div>
      {!isOwner && <Footer />}

    </div>
  )
}

export default App
