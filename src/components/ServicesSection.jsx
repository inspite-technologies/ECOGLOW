import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesSection.css';

// Asset Imports
import commercialImg from '../assets/A6.webp';
import residentialImg from '../assets/A7.webp';

gsap.registerPlugin(ScrollTrigger);

function ServicesSection() {
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Animate Text Content Group
      gsap.fromTo(textContentRef.current.children,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );

      // 2. Animate Image Cards
      gsap.fromTo([card1Ref.current, card2Ref.current],
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-section-replica" ref={sectionRef}>
      <div className="services-grid-container">
        
        {/* Column 1: Text Content */}
        <div className="services-text-col" ref={textContentRef}>
          <h2 className="services-main-title">Our<br />Services</h2>
          <div className="services-accent-line" />
          <p className="services-description-text">
            At EcoGlow, we deliver luxury-standard cleaning experiences designed 
            for conscious living. Every service reflects our boutique approach—intentional, 
            detail-focused, and safe for your family, your space, and the planet.
          </p>
          <button className="services-know-more-btn">Know More</button>
        </div>

        {/* Column 2: Commercial Card */}
        <div className="service-card-item" ref={card1Ref}>
          <div className="service-card-img-wrapper">
            <img src={commercialImg} alt="Commercial Cleaning" />
            <div className="service-card-info">
              <h3 className="service-card-name">Commercial</h3>
              <p className="service-card-detail">We support workspaces where performance, presentation, and professionalism matter.</p>
              <div className="service-card-arrow">→</div>
            </div>
          </div>
        </div>

        {/* Column 3: Residential Card (Bleed Effect) */}
        <div className="service-card-item bleed-to-edge" ref={card2Ref}>
          <div className="service-card-img-wrapper">
            <img src={residentialImg} alt="Residential Cleaning" />
            <div className="service-card-info">
              <h3 className="service-card-name">Residential</h3>
              <p className="service-card-detail">For homes that deserve more than routine cleaning — we elevate everyday living through detail.</p>
              <div className="service-card-arrow">→</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;