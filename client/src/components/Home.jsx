import React from 'react'
import Hero from './Hero'
import Featured from './Featured'
import Banner from './Banner'
import Testimonial from './Testminioal'
import Newsletter from './Newsletter'
import Footer from './Footer'

function Home() {
  return (
    <div className='pb-20 pt-[80px] bg-[#F1F5F9]'>

        <Hero/>
        <Featured/>
        <Banner/>
        <Testimonial/>
        <Newsletter/>
        
      
      
    </div>
  )
}

export default Home
