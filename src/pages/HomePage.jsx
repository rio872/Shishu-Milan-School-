import About from '../components/About';
import { Academics, WhyChoose } from '../components/Academics';
import Admission from '../components/Admission';
import Contact from '../components/Contact';
import Facilities from '../components/Facilities';
import Footer, { Newsletter } from '../components/Footer';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Location from '../components/Location';
import Founder from '../components/Founder';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';


export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        
        <About />
        <Stats />
        <Academics />
        <WhyChoose />
        <Founder />
        <Facilities />
       
        <Gallery />
        <Testimonials />
        <Admission />
        <Contact />
        <Location />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}