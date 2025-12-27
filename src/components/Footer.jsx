import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const contactRowRef = useRef(null);
  const linksRowRef = useRef(null);
  const bottomRowRef = useRef(null);

  useEffect(() => {
    // CRITICAL FIX: Set initial state to VISIBLE immediately
    // This prevents blank footer on refresh
    const footerElements = [contactRowRef.current, linksRowRef.current, bottomRowRef.current];
    
    gsap.set(footerElements, {
      opacity: 1,
      y: 0,
      clearProps: 'all' // Clear any previous GSAP properties
    });

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const checkAndAnimate = () => {
        const footerRect = contactRowRef.current?.getBoundingClientRect();
        const isInViewport = footerRect && footerRect.top < window.innerHeight;

        if (isInViewport) {
          // Footer is already visible - no animation needed
          gsap.set(footerElements, {
            opacity: 1,
            y: 0
          });
        } else {
          // Footer is below viewport - set up scroll animations
          // Set initial hidden state
          gsap.set(footerElements, {
            opacity: 0,
            y: 30
          });

          // Animate contact row
          gsap.to(contactRowRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contactRowRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true
            }
          });

          // Animate links row
          gsap.to(linksRowRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: linksRowRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true
            }
          });

          // Animate bottom row
          gsap.to(bottomRowRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bottomRowRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true
            }
          });
        }
      };

      checkAndAnimate();
    }, 100); // 100ms delay to ensure DOM is ready

    // Cleanup
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer className="main-footer">
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />
      
      <div className="footer-container">
        
        {/* TOP ROW: Contact Information */}
        <div className="footer-contact-row" ref={contactRowRef}>
          <div className="contact-item address">
            <i className="fas fa-map-marker-alt"></i>
            <span>Office Number M-090A, Fashion Parking,<br />Dubai Mall, United Arab Emirates.</span>
          </div>
          <div className="contact-details-group">
            <div className="contact-item phone">
              <i className="fas fa-phone-alt"></i>
              <a href="tel:+97141234567">+971 4 123 4567</a>
            </div>
            <div className="contact-item whatsapp">
              <i className="fab fa-whatsapp"></i>
              <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer">+971 50 123 4567</a>
            </div>
            <div className="contact-item email">
              <i className="far fa-envelope"></i>
              <a href="mailto:info@ecoglow.ae">info@ecoglow.ae</a>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: Links and Booking */}
        <div className="footer-links-row" ref={linksRowRef}>
          <div className="useful-links-label">USEFUL LINKS</div>
          <div className="links-grid">
            <div className="link-column">
              <a href="/services/deep-cleaning">Deep Cleaning</a>
              <a href="/services/mattress-cleaning">Mattress Cleaning</a>
            </div>
            <div className="link-column">
              <a href="/services/ac-duct">AC & Duct</a>
              <a href="/services/curtain-cleaning">Curtain Cleaning</a>
            </div>
            <div className="link-column">
              <a href="/services/carpet-cleaning">Carpet Cleaning</a>
              <a href="/services/disinfection">Disinfection & Sanitization</a>
            </div>
            <div className="link-column">
              <a href="/services/sofa-cleaning">Sofa Cleaning</a>
              <a href="/contact">Contact Us</a>
            </div>
          </div>
          <button className="footer-book-btn" onClick={() => window.location.href = '/book-service'}>
            Book Your Service
          </button>
        </div>

        {/* BOTTOM ROW: Social and Legal */}
        <div className="footer-bottom" ref={bottomRowRef}>
          <div className="social-follow">
            <span>FOLLOW US</span>
            <div className="social-icons">
              <a href="https://facebook.com/ecoglow" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com/ecoglow" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com/@ecoglow" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="legal-row">
            <p className="copyright">Copyright © 2025 EcoGlow. All rights reserved</p>
            <div className="legal-links">
              <a href="/terms-conditions">Terms and Conditions</a>
              <span> & </span>
              <a href="/privacy-policy">Privacy policy</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;