import React, { useEffect } from "react";
import { Home, MessageCircle } from "lucide-react";

import "./Services.css";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import service1 from '../assets/services1.webp'

const Services = () => {
  useEffect(() => {
    // AOS init would go here if you have it installed
    // AOS.init({ duration: 1000, once: true });
  }, []);

  const servicesData = [
  {
    id: 1,
    title: "Luxury Cleaning",
    subtitle: "Complete Area and Corner Cleaning",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80"
  },
  {
    id: 2,
    title: "Deep Kitchen Sanitize",
    subtitle: "Eco-Friendly Grease Removal",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80"
  },
  {
    id: 3,
    title: "Window & Glass Polish",
    subtitle: "Crystal Clear Streak-Free Finish",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80"
  },
  {
    id: 4,
    title: "Eco Upholstery Care",
    subtitle: "Fabric Rejuvenation & Protection",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80"
  }
];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="hero-title">
          <span className="about-text">All</span>
          <br />
          <span className="brand-text">Services</span>
        </h1>
      </section>

      {/* Breadcrumb Section */}
      <section className="about-intro">
        <div className="hero-breadcrumb">
          <span
            style={{
              color: "#14b8a6",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Home size={16} /> Home
          </span>
          <span style={{ color: "black", marginLeft: "6px" }}>
            / All Services
          </span>
        </div>
      </section>

      {/* Residential Services Section */}
      <section className="residential-section">
        <div className="container">
          <div className="content">
            <div className="section-label">All Services</div>
            <h4 className="title">Residential</h4>
            <div className="title-underline"></div>

            <p className="description">
              At EcoGlow, we deliver
              luxury-standard cleaning experiences designed for conscious
              living. Every service reflects our boutique approach—intentional,
              detail-focused, and safe for your family, your space, and the
              planet.
            </p>

            <p className="lorem-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              tristique malesuada sem quis condimentum. Nam consectetur enim
              justo, quis pharetra tortor accumsan at. Vestibulum lacinia
              interdum nulla, et eleifend ex. Sed vel urna bibendum, varius
              lorem at molestie libero. Praesent laoreet finibus sem et rutrum.
              Cras luctus finibus leo ullamcorper tempus. Donec volutpat justo
              vitae lorem porta consequat. Vivamus nisl tellus, tincidunt ac
              tristique eget, bibendum nec leo. Nullam hendrerit aliquet massa,
              in fermentum purus ullamcorper vel. Suspendisse consequat varius
              dictum.
            </p>
          </div>

          <div className="image-container">
             <img src={service1}  />
           
          </div>
        </div>
      </section>
      {/* Trusted Section */}
     <section className="trust-section">
  <div className="trust-badge">
    <h2 className="trusted-outline-text">Trusted by 100+ Clients</h2>
  </div>
</section>
   

<section className="residential-luxury-section">
  <div className="section-header">
    <h1>Residential</h1>
    <p>At EcoGlow, we deliver luxury-standard cleaning experiences designed for conscious living.</p>
  </div>

  {servicesData.map((service, index) => (
    <div 
      key={service.id} 
      /* index % 2 !== 0 creates the alternating pattern */
      className={`content-grid ${index % 2 !== 0 ? "row-reverse" : ""}`}
    >
      <div className="image-side">
        <img src={service.image} alt={service.title} />
      </div>

      <div className="text-side">
        <h2>{service.title}</h2>
        <h3>{service.subtitle}</h3>
        <p>
          At EcoGlow, we deliver luxury-standard cleaning experiences designed
          for conscious living. Every service reflects our boutique approach—intentional, 
          detail-focused, and safe for your family, your space, and the planet.
        </p>

        <div className="buttons">
          <button className="btn btn-book">Book Now</button>
          <button className="btn btn-whatsapp">
            <span className="whatsapp-icon-circle">
              <FontAwesomeIcon icon={faWhatsapp} />
            </span>
            Whatsapp Now
          </button>
        </div>
      </div>
    </div>
  ))}
</section>
 <section class="newsletter-section">
        <div class="newsletter-container">
            <div class="left-content">
                <h2 class="title">
                    <span class="lets">LET'S </span>
                    <span class="connect">CONNECT</span>
                </h2>
                <p class="subtitle">
                    Stay updated with upcoming EcoGlow events and news or simply get in touch.
                </p>
            </div>

            <div class="right-content">
                <p class="newsletter-label">You will get monthly newsletter</p>
                <form class="email-form" onsubmit="handleSubmit(event)">
                    <input 
                        type="email" 
                        class="email-input" 
                        placeholder="Enter your email ID"
                        required
                    />
                    <button type="submit" class="send-button">Send</button>
                </form>
            </div>
        </div>
    </section>
    </div>
  );
};

export default Services;