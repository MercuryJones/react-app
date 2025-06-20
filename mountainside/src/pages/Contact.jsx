import React from "react";
import "./Contact.css";
import Navbar from "../components/Navbar";


const Contact = () => {
  return (
    <>
      <Navbar />
      <main className="contact-page">
        <section className="contact-container">
          <h2>Contact Us</h2>
          <p>Have questions or feedback? We’d love to hear from you.</p>
          <form
            className="contact-form"
            action="https://formspree.io/f/movwnjwa"
            method="POST"
          >
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required />
            <button type="submit">Send Message</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Contact;
