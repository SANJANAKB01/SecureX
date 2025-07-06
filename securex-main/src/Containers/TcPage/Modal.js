// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, student }) => {
  if (!isOpen) return null;

  const score = student.terminated ? 0 : 20;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Name:      {student.name}</p>
        <p>Terminated: {student.terminated ? 'Yes' : 'No'}</p>
        <p>Score:      {score}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
