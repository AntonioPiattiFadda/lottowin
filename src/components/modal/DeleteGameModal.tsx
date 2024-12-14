import React from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const DeleteGameModal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md">
        <button className="absolute top-2 right-2" onClick={onClose}>
          &#10006; {/* Cruz para cerrar el modal */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default DeleteGameModal;