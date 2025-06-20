import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-page">
      <h2>Contact Us</h2>
      <p>We’d love to hear from you! Fill out the form below to send us a message.</p>

      <form
        action="https://formspree.io/f/your_form_id"
        method="POST"
        className="contact-form"
      >
        <label>
          Your Name:
          <input type="text" name="name" required />
        </label>

        <label>
          Your Email:
          <input type="email" name="email" required />
        </label>

        <label>
          Your Message:
          <textarea name="message" rows="5" required></textarea>
        </label>

        <button type="submit">Send Message</button>
      </form>

      <Link to="/" className="back-link">← Back to Home</Link>
    </section>
  );
};

export default Contact;
