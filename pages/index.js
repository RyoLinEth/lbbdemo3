import Head from 'next/head'
import React, {Fragment} from 'react';
import About from '../components/about/about';
import BlogSection from '../components/BlogSection/BlogSection';
import CommonHead from '../components/commonHead';
import ContactArea from '../components/ContactArea';
import ExprienceSec from '../components/Exprience/Exprience';
import Footer from '../components/footer/Footer';
import Hero from '../components/hero/hero';
import Navbar from '../components/Navbar/Navbar';
import Pricing from '../components/Pricing/Pricing';
import ProjectSection from '../components/ProjectSection/ProjectSection';
import Scrollbar from '../components/scrollbar/scrollbar';
import ServiceSection from '../components/ServiceSection/ServiceSection';
import Testimonial from '../components/Testimonial/Testimonial';

export default function Home() {
  return (
    <div id='scrool'>
      <CommonHead/>
      <Fragment>
            <div className="br-app">
                <Navbar/>
                <Hero/>
                <About/>
                <ServiceSection/>
                <ExprienceSec/>
                <ProjectSection/>
                <Testimonial/>
                <Pricing/>
                <ContactArea/>
                <BlogSection/>
                <Footer/>
                <Scrollbar/>
            </div>
        </Fragment>
    </div>
  )
}
