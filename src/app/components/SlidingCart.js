'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SlidingCart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Redirect to checkout page
    setTimeout(() => {
      setIsCheckingOut(false);
      router.push('/checkout');
    }, 500);
  };

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Your Cart</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400 mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => {
                const discountedPrice = item.discount > 0 
                  ? item.price * (1 - item.discount / 100)
                  : item.price;
                
                return (
                  <li key={item._id} className="py-4">
                    <div className="flex">
                      <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <div className="flex items-center">
                            <label htmlFor={`quantity-${item._id}`} className="mr-2 text-xs text-gray-600">
                              Qty:
                            </label>
                            <select
                              id={`quantity-${item._id}`}
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                              className="rounded-md border-gray-300 py-1 text-xs leading-4 focus:border-green-500 focus:ring-green-500"
                            >
                              {[...Array(item.quantity)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="text-right">
                            {item.discount > 0 && (
                              <span className="text-xs text-gray-500 line-through mr-1">
                                ${item.price.toFixed(2)}
                              </span>
                            )}
                            <span className="text-sm font-bold text-green-600">
                              ${(discountedPrice * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer with Checkout Button */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Total</p>
              <p>${getCartTotal().toFixed(2)}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors ${
                  isCheckingOut ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isCheckingOut ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Checkout'
                )}
              </button>
              <Link 
                href="/cart" 
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-center"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlidingCart; 