import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MessageSection.css';
import mdPhoto from '../assets/A11.webp';

gsap.registerPlugin(ScrollTrigger);

function MessageSection() {
  const sectionRef = useRef(null);
  const messageContentRef = useRef(null);
  const messageImageRef = useRef(null);
  const dividerRef = useRef(null);
  const connectTextRef = useRef(null);
  const newsletterFormRef = useRef(null);

  useEffect(() => {
    // Create a GSAP Context to handle all animations and scoped cleanup
    let ctx = gsap.context(() => {
      
      // 1. Animate message content
      gsap.fromTo(
        messageContentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: messageContentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true
          }
        }
      );

      // 2. Animate message image
      gsap.fromTo(
        messageImageRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: messageImageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true
          }
        }
      );

      // 3. Animate divider
      gsap.fromTo(
        dividerRef.current,
        { opacity: 0, scaleX: 0 },
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true
          }
        }
      );

      // 4. Animate connect text
      gsap.fromTo(
        connectTextRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: connectTextRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true
          }
        }
      );

      // 5. Animate newsletter form
      gsap.fromTo(
        newsletterFormRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: newsletterFormRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true
          }
        }
      );

    }, sectionRef); // Scope the GSAP context to this section

    return () => {
      ctx.revert(); // Clean up all animations and ScrollTriggers on unmount
    };
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter form submitted");
  };

  return (
    <section 
      className="unified-footer-section" 
      id="message" 
      ref={sectionRef}
    >
      {/* MD'S MESSAGE SECTION */}
      <div className="message-container">
        <div className="message-content" ref={messageContentRef}>
          <h2 className="section-heading-thin">MD's Message</h2>
          <div className="thin-teal-underline"></div>
          
          <p className="message-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis 
            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.
          </p>

          <div className="signature-area">
            <span className="md-name-label">Full Name</span>
            <div className="handwritten-signature">Kami Tarazi</div>
          </div>
        </div>

        <div className="message-image" ref={messageImageRef}>
          <img src={mdPhoto} alt="Managing Director" className="md-profile-img" />
        </div>
      </div>

      <div className="section-divider" ref={dividerRef}></div>

      {/* LET'S CONNECT SECTION */}
      <div className="connect-container">
        <div className="connect-text" ref={connectTextRef}>
          <h2 className="section-heading-thin">
            LET'S <span className="teal-text-thin">CONNECT</span>
          </h2>
          <p className="connect-subtitle">Stay updated with upcoming EcoGlow events and news or simply get in touch.</p>
        </div>

        <div className="newsletter-form-container" ref={newsletterFormRef}>
          <span className="newsletter-label">You will get monthly newsletter</span>
          <form className="input-group-newsletter" onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email ID" 
              className="newsletter-input"
              required
              aria-label="Email address for newsletter"
            />
            <button type="submit" className="newsletter-send-btn">Send</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default MessageSection;