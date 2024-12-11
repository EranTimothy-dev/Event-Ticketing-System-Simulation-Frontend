import React from 'react';
import logo from '../pages/logo1.jpeg';
import './Logo.css';

export default function Logo() {
  return (
    <div className="logo-container">
      <img
        src={logo}
        alt="Company Logo"
        className="logo-image"
      />
    </div>
  );
}
