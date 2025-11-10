import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import HeroSection from '../Components/Hero/HeroSection';
import Card from '../Components/Card/Card';
import FAQSection from '../Components/FAQ/FAQ';
import ContactUs from '../Components/Contactus/Contactus';
import Header from '../Components/Header/Header';
import Animatedcard from '../Components/Animatedcard/Animatedcard';

const Homepage = () => {
  return (
    <div>
      {/* <Header/> */}
      <Navbar/>
      <HeroSection/>
      <Animatedcard/>
      <Card/>
      <FAQSection/>
      <ContactUs/>
    </div>
  )
}

export default Homepage