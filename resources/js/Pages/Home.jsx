import React from 'react'
import Hero from '../UI/Hero'
import AboutUs from '../UI/AboutUs'
import Kegiatan from '../UI/Kegiatan'
import Carousel from '../UI/Carousel'
import Edukasi from '../UI/Edukasi'
import Mitra from '../UI/Mitra'
import FAQ from '../UI/Faq'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <Kegiatan />
      <Carousel />
      <Edukasi />
      <Mitra />
      <FAQ />
      <Footer />
    </>
  )
}

export default Home