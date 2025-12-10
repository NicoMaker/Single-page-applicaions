import React from 'react';
import { X, Sparkles } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-slideUp">
        {/* L'animazione slideUp dovrebbe essere definita globalmente, ad esempio in index.css */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-orange-50 to-red-50">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Sparkles className="text-orange-500" size={28} />
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        
        {footer && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;