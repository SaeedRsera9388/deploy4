// src/Card.js
import React from 'react';
import './Card.scss'; // You can create a CSS file for styling

function Card({ title, description }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Card;
