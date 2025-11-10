import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ContactSection from '../Components/Contactus/Contactus'
import Servicecard from '../Components/Service card/Servicecard'
import Valueprop from '../Components/valueproposition/Valueprop'

const Servicepage = () => {
  return (
    <div className='mt-12'>
        <Navbar/>
        <Servicecard/>
        <Valueprop/>
        <ContactSection/>
    </div>
  )
}

export default Servicepage