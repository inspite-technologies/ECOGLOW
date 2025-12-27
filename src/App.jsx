import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Components
import PageHeader from './components/PageHeader';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Services from './pages/Services';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Packages from './pages/Packages';
import BookService from './pages/BookService';
import TermsConditions from './pages/TermsConditions';

// Register GSAP Plugin globally
gsap.registerPlugin(ScrollTrigger);

// Layout Component to conditionally render PageHeader
const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {/* Render PageHeader only on non-home pages */}
      {!isHomePage && <PageHeader />}
      {children}
      <Footer />
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock body scroll when loading
    if (loading) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }

    // Simulate loading time (minimum 2 seconds for smooth experience)
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Refresh ScrollTrigger after preloader finishes
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, 2000); // 2 seconds minimum loading time

    // Also check if page is fully loaded
    const handleFullLoad = () => {
      // Only hide preloader after minimum time has passed
      const minLoadTime = 2000;
      const loadTime = performance.now();
      
      if (loadTime >= minLoadTime) {
        setLoading(false);
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener('load', handleFullLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleFullLoad);
      document.body.classList.remove('loading');
    };
  }, [loading]);

  useEffect(() => {
    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();
  }, []);

  return (
    <Router>
      <div className="app">
        {/* Show Preloader */}
        {loading && <Preloader />}
        
        {/* Main Content */}
        <div className={loading ? 'app-content hidden' : 'app-content visible'}>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/book-service" element={<BookService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
            </Routes>
          </Layout>
        </div>
      </div>
    </Router>
  );
}

export default App;