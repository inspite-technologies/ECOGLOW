import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSection.css';

// Import your image
import aboutImage from '../assets/A6.webp';

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
  const [expandedSection, setExpandedSection] = useState('vision'); // 'vision' open by default
  
  const sectionRef = useRef(null);
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);
  const imageRef = useRef(null);
  const accordionRef = useRef(null);
  const refreshTimeoutRef = useRef(null);

  useEffect(() => {
    // Setup animations with GSAP Context for scoped cleanup
    const ctx = gsap.context(() => {
      
      // 1. Animate Top Left Title
      gsap.fromTo(textLeftRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1, 
          x: 0, 
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true 
          }
        }
      );

      // 2. Animate Top Right Paragraphs
      gsap.fromTo(textRightRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          delay: 0.1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );

      // 3. Animate Bottom Left Image
      gsap.fromTo(imageRef.current,
        { opacity: 0, y: 100, force3D: true },
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
            once: true,
            fastScrollEnd: true
          }
        }
      );

      // 4. Animate Bottom Right Accordion
      gsap.fromTo(accordionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          delay: 0.15, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Toggle accordion section
  const toggleSection = (section) => {
    setExpandedSection(prev => prev === section ? null : section);
    
    // Clear existing timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    
    // Refresh ScrollTrigger after accordion animation
    refreshTimeoutRef.current = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500); 
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      {/* First Row - Two Column Text Content */}
      <div className="about-text-row">
        <div className="about-text-left" ref={textLeftRef}>
          <h2 className="about-main-title">
            <span className="luxury-text">Luxury standard</span> cleaning service
            born in Dubai, redefining what it means to live and work in clean,
            conscious spaces.
          </h2>
        </div>
        
        <div className="about-text-right" ref={textRightRef}>
          <p>
            We go beyond surface cleaning; combining eco-friendly products, refined
            service standards, and a detail-oriented approach to create environments that
            feel as fresh as they look.
          </p>
          <p>
            Focused on quality over quantity, EcoGlow serves both residential and
            commercial clients who value wellness, sustainability, and trust.
          </p>
          <button className="know-more-secondary-btn">Know More</button>
        </div>
      </div>

      {/* Second Row - Image Left, Accordion Right */}
      <div className="about-content-row">
        <div className="about-image-column" ref={imageRef}>
          <div className="about-image-wrapper">
            <img 
              src={aboutImage} 
              alt="Modern luxury space" 
              className="about-image" 
            />
          </div>
        </div>

        <div className="about-accordion-column" ref={accordionRef}>
          <div className="about-accordion">
            {/* Vision Section */}
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleSection('vision')}
              >
                <span className="accordion-title">Vision</span>
                <span className="accordion-icon">
                  {expandedSection === 'vision' ? '−' : '+'}
                </span>
              </button>
              <div className={`accordion-content ${expandedSection === 'vision' ? 'expanded' : ''}`}>
                <p>
                  Focused on quality over quantity, EcoGlow serves both residential and
                  commercial clients who value wellness, sustainability, and trust.
                </p>
              </div>
            </div>

            {/* Mission Section */}
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleSection('mission')}
              >
                <span className="accordion-title">Mission</span>
                <span className="accordion-icon">
                  {expandedSection === 'mission' ? '−' : '+'}
                </span>
              </button>
              <div className={`accordion-content ${expandedSection === 'mission' ? 'expanded' : ''}`}>
                <p>
                  To deliver exceptional cleaning services that exceed expectations through
                  sustainable practices, innovative solutions, and unwavering commitment to
                  customer satisfaction.
                </p>
              </div>
            </div>

            {/* Values Section */}
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleSection('values')}
              >
                <span className="accordion-title">Values</span>
                <span className="accordion-icon">
                  {expandedSection === 'values' ? '−' : '+'}
                </span>
              </button>
              <div className={`accordion-content ${expandedSection === 'values' ? 'expanded' : ''}`}>
                <p>
                  Excellence, integrity, sustainability, and respect form the foundation of
                  everything we do. We believe in creating lasting relationships built on
                  trust and exceptional service delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;