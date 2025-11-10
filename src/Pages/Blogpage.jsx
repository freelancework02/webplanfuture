import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import ContactSection from '../Components/Contactus/Contactus';
import Blog from '../Components/Blog/Blog';

const Blogpage = () => {
  return (
    <div>
        <Navbar/>
        <Blog/>
        <ContactSection/>
    </div>
  )
}

export default Blogpage