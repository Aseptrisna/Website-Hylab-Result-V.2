// components/Modal.js atau Modal.tsx (tergantung dari ekstensi file TypeScript atau JavaScript)
import React from 'react';

interface ModalProps {
  imageUrl: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex">
      <div className="relative p-8 bg-white w-full max-w-lg m-auto rounded-lg">
        <div className="absolute top-0 right-0">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <img src={`https://image-view.sta.my.id/data/${imageUrl}`} alt="Modal Image" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
