// src/Modal.js
import React from 'react';
import './Modal.css'; // Make sure to style the modal

const Modal = ({ isOpen, onClose, details }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <h2>{details.title}</h2>
          <p>{details.description}</p>
          {/* You can add more details here */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
