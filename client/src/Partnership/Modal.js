import React from 'react';
import './Modal.css';
import { FaTimes } from 'react-icons/fa'; // Importing a close icon from react-icons

function Modal({ title, description, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <p>{description}</p>
        </div>
        <div className="modal-footer">
          <button className="action-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
