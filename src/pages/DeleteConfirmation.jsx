import { createPortal } from 'react-dom';
import { useRef, useEffect } from 'react';

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    
    document.body.classList.add('overflow-hidden');
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onCancel]);

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
      >
        <h3 className="text-lg font-semibold mb-4">Delete Blog</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this blog? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default DeleteConfirmation;