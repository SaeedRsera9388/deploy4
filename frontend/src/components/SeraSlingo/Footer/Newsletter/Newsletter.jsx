// Newsletter.jsx
import React, { useState } from 'react';
import './Newsletter.scss';

function Newsletter() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const subscribe = () => {
    // You can implement your subscription logic here
    console.log(`Subscribed with email: ${email}`);
  };

  return (
    <div className="newsletter-container">
      <h2>Subscribe to Our Newsletter</h2>
      <p>Stay up to date with our latest news and updates!</p>
      <div className="input-container">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        <button onClick={subscribe}>Subscribe</button>
      </div>
    </div>
  );
}

export default Newsletter;
