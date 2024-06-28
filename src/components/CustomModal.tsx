import React from 'react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-weddingGold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
