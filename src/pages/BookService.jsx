import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./BookService.css";

function BookService() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cleaningFor: "Residential",
    needMaterials: "Yes, I need cleaning materials.",
    bedrooms: "Studio",
    rooms: "Studio",
    date: "",
    timing: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
      easing: "ease-in-out",
      mirror: true,
      anchorPlacement: "top-bottom",
    });

    const handleScroll = () => {
      AOS.refresh();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      AOS.refresh();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      errors.phone = "Please enter a valid 9-digit phone number";
    }

    if (!formData.date) {
      errors.date = "Please select a date";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.date = "Please select a future date";
      }
    }

    if (!formData.timing) {
      errors.timing = "Please select a time";
    }

    return errors;
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      cleaningFor: "Residential",
      needMaterials: "Yes, I need cleaning materials.",
      bedrooms: "Studio",
      rooms: "Studio",
      date: "",
      timing: "",
    });
    setFormErrors({});
    setFormStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormStatus("error");
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    console.log("Form submitted:", formData);
    setFormStatus("success");

    setTimeout(() => {
      handleReset();
    }, 3000);
  };

  return (
    <>
      {/* Hero Banner Section */}
      <section className="bookservice-hero-banner">
        <div className="bookservice-hero-overlay"></div>
        <div className="bookservice-hero-content">
          <div className="bookservice-hero-text-wrapper">
            <p className="bookservice-hero-small-text">Book Your</p>
            <h1 className="bookservice-hero-large-text">Services</h1>
          </div>
        </div>
      </section>

      <section className="bookservice-section" id="book">
        <div className="bookservice-container">
          {/* Top Label with Slash */}
          <div className="bookservice-top-label-wrapper">
            <span className="bookservice-home-icon"></span>
            <span className="bookservice-label-separator">/</span>
            <span className="bookservice-label-text">BOOK YOUR SERVICE</span>
          </div>

          {/* Book Now Form */}
          <div className="bookservice-form-section">
            <div className="bookservice-section-header">
              <p className="bookservice-small-label">Book Now</p>
              <h2 className="bookservice-main-title">
                Let us know you are interested:
              </h2>
              <div className="bookservice-accent-line"></div>
              <p className="bookservice-subtitle">All fields are mandatory</p>
            </div>

            <form onSubmit={handleSubmit} className="bookservice-form">
              {/* First Name & Last Name Row */}
              <div className="bookservice-form-row">
                <div className="bookservice-form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`bookservice-input ${
                      formErrors.firstName ? "bookservice-error" : ""
                    }`}
                  />
                  {formErrors.firstName && (
                    <span className="bookservice-error-message">
                      {formErrors.firstName}
                    </span>
                  )}
                </div>

                <div className="bookservice-form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`bookservice-input ${
                      formErrors.lastName ? "bookservice-error" : ""
                    }`}
                  />
                  {formErrors.lastName && (
                    <span className="bookservice-error-message">
                      {formErrors.lastName}
                    </span>
                  )}
                </div>
              </div>

              {/* Email & Phone Row */}
              <div className="bookservice-form-row">
                <div className="bookservice-form-group">
                  <label htmlFor="email">Email ID</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bookservice-input ${
                      formErrors.email ? "bookservice-error" : ""
                    }`}
                  />
                  {formErrors.email && (
                    <span className="bookservice-error-message">
                      {formErrors.email}
                    </span>
                  )}
                </div>

                <div className="bookservice-form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <div
                    className={`bookservice-phone-wrapper ${
                      formErrors.phone ? "bookservice-error" : ""
                    }`}
                  >
                    <div className="bookservice-country-code">+971</div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bookservice-input bookservice-phone-input"
                      maxLength="9"
                    />
                  </div>
                  {formErrors.phone && (
                    <span className="bookservice-error-message">
                      {formErrors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Cleaning For */}
              <div className="bookservice-form-group bookservice-full-width">
                <label htmlFor="cleaningFor">Cleaning For?</label>
                <div className="bookservice-select-wrapper">
                  <select
                    id="cleaningFor"
                    name="cleaningFor"
                    value={formData.cleaningFor}
                    onChange={handleChange}
                    className="bookservice-select"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Office">Office</option>
                  </select>
                  <span className="bookservice-select-arrow">▼</span>
                </div>
              </div>

              {/* Need Materials & Bedrooms Row */}
              <div className="bookservice-form-row">
                <div className="bookservice-form-group">
                  <label htmlFor="needMaterials">Need cleaning materials?</label>
                  <div className="bookservice-select-wrapper">
                    <select
                      id="needMaterials"
                      name="needMaterials"
                      value={formData.needMaterials}
                      onChange={handleChange}
                      className="bookservice-select"
                    >
                      <option value="Yes, I need cleaning materials.">
                        Yes, I need cleaning materials.
                      </option>
                      <option value="No, I have cleaning materials.">
                        No, I have cleaning materials.
                      </option>
                    </select>
                    <span className="bookservice-select-arrow">▼</span>
                  </div>
                </div>

                <div className="bookservice-form-group">
                  <label htmlFor="bedrooms">No. of Bedrooms</label>
                  <div className="bookservice-select-wrapper">
                    <select
                      id="bedrooms"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      className="bookservice-select"
                    >
                      <option value="Studio">Studio</option>
                      <option value="1 Bedroom">1 Bedroom</option>
                      <option value="2 Bedrooms">2 Bedrooms</option>
                      <option value="3 Bedrooms">3 Bedrooms</option>
                      <option value="4 Bedrooms">4 Bedrooms</option>
                      <option value="5+ Bedrooms">5+ Bedrooms</option>
                    </select>
                    <span className="bookservice-select-arrow">▼</span>
                  </div>
                </div>
              </div>

              {/* Rooms & Date Row */}
              <div className="bookservice-form-row">
                <div className="bookservice-form-group">
                  <label htmlFor="rooms">No. of Rooms</label>
                  <div className="bookservice-select-wrapper">
                    <select
                      id="rooms"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleChange}
                      className="bookservice-select"
                    >
                      <option value="Studio">Studio</option>
                      <option value="1 Room">1 Room</option>
                      <option value="2 Rooms">2 Rooms</option>
                      <option value="3 Rooms">3 Rooms</option>
                      <option value="4 Rooms">4 Rooms</option>
                      <option value="5+ Rooms">5+ Rooms</option>
                    </select>
                    <span className="bookservice-select-arrow">▼</span>
                  </div>
                </div>

                <div className="bookservice-form-group">
                  <label htmlFor="date">Select the Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`bookservice-input ${
                      formErrors.date ? "bookservice-error" : ""
                    }`}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {formErrors.date && (
                    <span className="bookservice-error-message">
                      {formErrors.date}
                    </span>
                  )}
                </div>
              </div>

              {/* Timing */}
              <div className="bookservice-form-group bookservice-full-width">
                <label htmlFor="timing">Select the Timing</label>
                <input
                  type="time"
                  id="timing"
                  name="timing"
                  value={formData.timing}
                  onChange={handleChange}
                  className={`bookservice-input ${
                    formErrors.timing ? "bookservice-error" : ""
                  }`}
                />
                {formErrors.timing && (
                  <span className="bookservice-error-message">
                    {formErrors.timing}
                  </span>
                )}
              </div>

              {/* Form Actions */}
              <div className="bookservice-form-actions">
                <button
                  type="button"
                  className="bookservice-btn-reset"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button type="submit" className="bookservice-btn-submit">
                  Submit
                </button>
              </div>

              {/* Form Status Messages */}
              {formStatus === "success" && (
                <div className="bookservice-message bookservice-success">
                  Thank you! Your booking request has been submitted
                  successfully. We will contact you shortly.
                </div>
              )}

              {formStatus === "error" && (
                <div className="bookservice-message bookservice-error-msg">
                  Please fill in all required fields correctly.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookService;