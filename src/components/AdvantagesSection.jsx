import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AdvantagesSection.css';

// Import icons
import icon1 from '../assets/01.png';
import icon2 from '../assets/02.png';
import icon3 from '../assets/03.png';
import icon4 from '../assets/04.png';
import icon5 from '../assets/05.png';
import icon6 from '../assets/06.png';
import ctaImage from '../assets/A10.webp';

gsap.registerPlugin(ScrollTrigger);

function AdvantagesSection() {
  const [expandedItem, setExpandedItem] = useState('clean');
  
  const headerRef = useRef(null);
  const underlineRef = useRef(null);
  const accordionItemsRef = useRef([]);
  const ctaSectionRef = useRef(null);
  const refreshTimeoutRef = useRef(null);

  useEffect(() => {
    // Animate header
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true
        }
      }
    );

    // Animate underline
    gsap.fromTo(
      underlineRef.current,
      { width: 0, opacity: 0 },
      {
        width: '70px',
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: underlineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true
        }
      }
    );

    // Animate accordion items with stagger
    accordionItemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true
            }
          }
        );
      }
    });

    // Animate CTA section
    gsap.fromTo(
      ctaSectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true
        }
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  const toggleItem = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
    
    // Debounced refresh for accordion height changes
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    
    refreshTimeoutRef.current = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600); // Match CSS transition time
  };

  const advantages = [
    { id: 'clean', icon: icon1, title: 'Clean Without Compromise', description: 'EcoGlow ensures a healthier environment by using non-toxic, eco-friendly products that protect your home, your family, and your wellbeing. Every clean is designed around your wellness — delivered through safe, sustainable, biodegradable solutions.' },
    { id: 'nature', icon: icon2, title: 'Nature-Approved Cleaning', description: 'Our cleaning solutions are derived from natural ingredients, ensuring they are gentle on surfaces while being tough on dirt and grime.' },
    { id: 'worth', icon: icon3, title: 'Worth Every Clean', description: 'Premium quality cleaning services that deliver exceptional results, making every session worthwhile and your space pristine.' },
    { id: 'cost', icon: icon4, title: 'Cost-effective', description: 'High-quality cleaning services at competitive prices, offering great value without compromising on excellence.' },
    { id: 'luxury', icon: icon5, title: 'Luxury Care', description: 'Experience boutique-level cleaning with meticulous attention to detail, treating your space with the care it deserves.' },
    { id: 'trusted', icon: icon6, title: 'Trusted Promise', description: 'Built on reliability and integrity, we deliver consistent, trustworthy service that exceeds expectations.' }
  ];

  return (
    <section className="advantages-section" id="advantages">
      {/* Header Section */}
      <div className="advantages-header" ref={headerRef}>
        <h2 className="advantages-title">Our Key<br />Advantages</h2>
        <div className="advantages-underline" ref={underlineRef}></div>
      </div>

      {/* Accordion */}
      <div className="advantages-accordion">
        {advantages.map((item, index) => (
          <div 
            key={item.id} 
            className={`advantage-item ${expandedItem === item.id ? 'active' : ''}`}
            ref={(el) => (accordionItemsRef.current[index] = el)}
          >
            <div className="advantage-wrapper">
              <div className="advantage-icon-section">
                <img src={item.icon} alt="" className="advantage-icon-image" />
              </div>
              
              <div className="advantage-content-section">
                <div 
                  className="advantage-header-row"
                  onClick={() => toggleItem(item.id)}
                >
                  <h3 className="advantage-title">{item.title}</h3>
                  <span className="advantage-toggle">
                    {expandedItem === item.id ? '−' : '+'}
                  </span>
                </div>

                <div 
                  id={`advantage-description-${item.id}`}
                  className={`advantage-description-container ${expandedItem === item.id ? 'show' : ''}`}
                >
                  <div className="advantage-description-content">
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="advantages-cta" ref={ctaSectionRef}>
        <div className="cta-left-full">
          <img src={ctaImage} alt="Excellence in cleaning" className="cta-photo" />
        </div>
        <div className="cta-right-content">
          <h2 className="cta-title">
            We Promise – <span className="cta-highlight-text">Excellence</span><br />
            in Every Home
          </h2>
          <div className="cta-button-group">
            <button className="cta-button-primary">Book Your Service</button>
            <button className="cta-button-whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Connect with whatsapp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdvantagesSection;