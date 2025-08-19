'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const CartButton = ({ product, onAddToCart }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent the product card click event
    setIsAdding(true);
    addToCart(product);
    
    // Reset the adding state after a short delay
    setTimeout(() => {
      setIsAdding(false);
      // Notify parent component to open cart
      if (onAddToCart) {
        onAddToCart();
      }
    }, 500);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`${
        isAdding ? 'bg-green-700' : 'bg-green-600'
      } text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors flex items-center gap-1`}
    >
      {isAdding ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Adding...
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to Cart
        </>
      )}
    </button>
  );
};

export default CartButton; 