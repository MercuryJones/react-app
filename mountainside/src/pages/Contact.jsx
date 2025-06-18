import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-page">
      <h2>Contact Us</h2>
      <p>Email: johnarcherhatch@gmail.com</p>
      <p>Phone: (434) 439-0150</p>
      <Link to="/" className="back-link">← Back to Home</Link>
    </section>
  );
};

export default Contact;
