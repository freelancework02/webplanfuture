import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ContactSection from '../Components/Contactus/Contactus'
import Productcard from '../Components/Productcard/Productcard'

const Productpage = () => {
  return (
    <div>
        <Navbar/>
        <Productcard/>
        <ContactSection/>
    </div>
  )
}

export default Productpage