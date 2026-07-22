import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: '', email: '', subject: '', message: '' };

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your name.';
      valid = false;
    }

    if (!isValidEmail(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Please enter a subject.';
      valid = false;
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters.';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setShowSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  const handleTilt = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleResetTilt = (e) => {
    e.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section className="section" id="contact">
      <div className="section-inner">
        <p className="section-eyebrow reveal" data-reveal="fade-up">Get In Touch</p>
        <h2 className="section-title reveal" data-reveal="fade-up">
          Let's Build Something <span className="text-gradient">Great</span>
        </h2>

        <div className="contact-grid">
          <form
            className="glass-card contact-form reveal"
            data-reveal="fade-right"
            id="contactForm"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className={`form-group ${errors.name ? 'error' : ''}`}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
              />
              <span className="form-error">{errors.name}</span>
            </div>

            <div className={`form-group ${errors.email ? 'error' : ''}`}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="form-error">{errors.email}</span>
            </div>

            <div className={`form-group ${errors.subject ? 'error' : ''}`}>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
              />
              <span className="form-error">{errors.subject}</span>
            </div>

            <div className={`form-group ${errors.message ? 'error' : ''}`}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell me about your project or opportunity..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <span className="form-error">{errors.message}</span>
            </div>

            <button type="submit" className="btn btn-primary form-submit" data-magnetic>
              <span>Send Message</span>
            </button>

            <div className={`form-success ${showSuccess ? 'show' : ''}`}>
              <span className="success-check">✓</span> Message sent successfully! I'll get back to you soon.
            </div>
          </form>

          <div className="contact-info reveal" data-reveal="fade-left">
            <div className="glass-card contact-detail" data-tilt onMouseMove={handleTilt} onMouseLeave={handleResetTilt}>
              <p className="contact-label">Phone</p>
              <a href="tel:+916205189816" className="contact-value">+91 6205189816</a>
            </div>

            <div className="glass-card contact-detail" data-tilt onMouseMove={handleTilt} onMouseLeave={handleResetTilt}>
              <p className="contact-label">Email</p>
              <a href="mailto:kishlaysingh073@gmail.com" className="contact-value">kishlaysingh073@gmail.com</a>
            </div>

            <div className="glass-card contact-detail" data-tilt onMouseMove={handleTilt} onMouseLeave={handleResetTilt}>
              <p className="contact-label">GitHub</p>
              <a href="https://github.com/KishlaySingh1" target="_blank" rel="noopener noreferrer" className="contact-value">
                github.com/KishlaySingh1
              </a>
            </div>

            <div className="glass-card contact-detail" data-tilt onMouseMove={handleTilt} onMouseLeave={handleResetTilt}>
              <p className="contact-label">LinkedIn</p>
              <a href="https://www.linkedin.com/in/kishlay" target="_blank" rel="noopener noreferrer" className="contact-value">
                linkedin.com/in/kishlay
              </a>
            </div>

            <div className="glass-card contact-detail" data-tilt onMouseMove={handleTilt} onMouseLeave={handleResetTilt}>
              <p className="contact-label">Instagram</p>
              <a href="https://www.instagram.com/kxzlay_58" target="_blank" rel="noopener noreferrer" className="contact-value">
                @kxzlay_58
              </a>
            </div>

            <div className="glass-card map-placeholder">
              <p>Jaipur, Rajasthan, India</p>
              <span className="map-pulse"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
