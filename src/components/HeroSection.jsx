import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Added ScrollTrigger import
import './HeroSection.css';

// Asset Imports
import img1 from '../assets/A1.webp';
import img2 from '../assets/A2.webp';
import img3 from '../assets/A3.webp';
import img4 from '../assets/A4.webp';
import img5 from '../assets/a2.1.webp';

const SERVICES = [
  { id: 1, title: 'Clean Beyond Visible', subtitle: 'Deep Cleaning', img: img1 },
  { id: 2, title: 'Freshness Underfoot', subtitle: 'Carpet Cleaning', img: img2 },
  { id: 3, title: 'Comfort Restored.', subtitle: 'Sofa Cleaning', img: img3 },
  { id: 4, title: 'Freshness Draped in Style', subtitle: 'Curtain Cleaning', img: img4 },
  { id: 5, title: 'Sleep with Confidence', subtitle: 'Mattress Cleaning', img: img5 },
];

function HeroSection() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [displayTextIndex, setDisplayTextIndex] = useState(0);
  const [cardPositions, setCardPositions] = useState([
    { serviceIndex: 1, position: 0 },
    { serviceIndex: 2, position: 1 },
    { serviceIndex: 3, position: 2 },
    { serviceIndex: 4, position: 3 },
    { serviceIndex: 0, position: 4 },
  ]);
  const [isExpanding, setIsExpanding] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  
  const expandingCloneRef = useRef(null);
  const bgOverlayRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const animateCardExpansion = (direction) => {
    if (isExpanding) return;

    const topCardElement = cardsContainerRef.current.querySelector('[data-position="0"]');
    if (!topCardElement || !expandingCloneRef.current) return;

    setIsExpanding(true);
    const rect = topCardElement.getBoundingClientRect();
    const clone = expandingCloneRef.current;
    const bgOverlay = bgOverlayRef.current;

    const topCardData = cardPositions.find(c => c.position === 0);
    const nextBgImage = SERVICES[topCardData.serviceIndex].img;
    const nextBgIndex = topCardData.serviceIndex;

    // STEP 1: Set Clone with BAKED-IN Dark Overlay
    gsap.set(clone, {
      display: 'block',
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${nextBgImage})`,
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      borderRadius: '8px',
      zIndex: 50,
    });

    const masterTL = gsap.timeline({
      onComplete: () => {
        setIsExpanding(false);
      }
    });

    // Fade current content out
    masterTL.to([titleRef.current, subtitleRef.current, buttonRef.current], {
      opacity: 0, y: -20, duration: 0.3
    }, 0);

    // STEP 2: Expand using physical units
    masterTL.to(clone, {
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
      duration: 1.2,
      ease: "expo.inOut"
    }, 0.1);

    // Carousel Slide Logic
    const allCards = cardsContainerRef.current.querySelectorAll('.card-item');
    allCards.forEach((card) => {
      const currentPos = parseInt(card.getAttribute('data-position'));
      const step = 160; 
      let targetY, targetOpacity = 1;

      if (direction === 'next') {
        if (currentPos === 0) { targetY = step * 4; targetOpacity = 0; }
        else { targetY = step * (currentPos - 1); }
      } else {
        if (currentPos === 4) { targetY = 0; }
        else if (currentPos === 3) { targetY = step * 4; targetOpacity = 0; }
        else { targetY = step * (currentPos + 1); }
      }

      masterTL.to(card, {
        y: targetY, opacity: targetOpacity, duration: 1.0, ease: "power3.inOut"
      }, 0.1);
    });

    // STEP 3: Smooth Background Handoff
    masterTL.call(() => {
      bgOverlay.style.backgroundImage = `url(${nextBgImage})`;
      setCurrentBgIndex(nextBgIndex);
      setDisplayTextIndex(nextBgIndex);
      setCardPositions(prev => prev.map(c => ({
        ...c,
        position: direction === 'next' ? (c.position === 0 ? 4 : c.position - 1) : (c.position === 4 ? 0 : c.position + 1)
      })));
    }, null, 0.9);

    // Fade Text back in
    masterTL.fromTo([titleRef.current, subtitleRef.current, buttonRef.current], 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, 
      1.1
    );

    // STEP 4: Reveal Static Background & REFRESH ScrollTrigger
    masterTL.to(clone, {
      opacity: 0,
      duration: 0.6,
      onComplete: () => {
        gsap.set(clone, { display: 'none' });
        gsap.set(".card-item", { clearProps: "all" });
        
        // --- CRITICAL FIX START ---
        // This ensures the rest of the page animations aren't broken by the expansion
        ScrollTrigger.refresh();
        // --- CRITICAL FIX END ---

        setIsExpanding(false);
      }
    }, 1.4);
  };

  const moveToNext = useCallback(() => animateCardExpansion('next'), [isExpanding, cardPositions]);
  const moveToPrevious = useCallback(() => animateCardExpansion('prev'), [isExpanding, cardPositions]);

  useEffect(() => {
    if (!autoPlayEnabled) return;
    const timer = setInterval(moveToNext, 5000);
    return () => clearInterval(timer);
  }, [autoPlayEnabled, moveToNext]);

  return (
    <section className="hero-section">
      <div ref={bgOverlayRef} className="hero-bg-overlay" style={{ backgroundImage: `url(${SERVICES[currentBgIndex].img})` }} />
      <div ref={expandingCloneRef} className="expanding-card-clone-gsap" />

      <div className="hero-container">
        <div className="hero-content">
          <div className="text-box">
            <h1 ref={titleRef} className="hero-title">{SERVICES[displayTextIndex].title}</h1>
            <p ref={subtitleRef} className="hero-subtitle">{SERVICES[displayTextIndex].subtitle}</p>
            <button ref={buttonRef} className="know-more-btn">Know More</button>
          </div>
        </div>

        <div ref={cardsContainerRef} className="cards-stack-container">
          {cardPositions.map((cardData, idx) => (
            <div key={`${cardData.serviceIndex}-${idx}`} className="card-item" data-position={cardData.position}>
              <img src={SERVICES[cardData.serviceIndex].img} alt="" />
              <div className="card-label">{SERVICES[cardData.serviceIndex].title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="arrows">
        <div className="arrow" onClick={() => { setAutoPlayEnabled(false); moveToPrevious(); }}><ChevronUp size={20} /></div>
        <div className="arrow" onClick={() => { setAutoPlayEnabled(false); moveToNext(); }}><ChevronDown size={20} /></div>
      </div>
    </section>
  );
}

export default HeroSection;