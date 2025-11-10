import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Aboutus from '../Components/Aboutus/About';
import ContactSection from '../Components/Contactus/Contactus';
import OurClients from '../Components/Ourclients/OurClients';
const Aboutpage = () => {
  return (
    <div>
      <Navbar />
      <Aboutus />
      <OurClients />
      <ContactSection />
    </div>
  )
}

export default Aboutpage;