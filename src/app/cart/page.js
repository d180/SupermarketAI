'use client';

import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { user } = useUser();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    if (!user) {
      // Store the current URL to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', '/checkout');
      router.push('/login');
      return;
    }
    
    setIsCheckingOut(true);
    router.push('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg 
            className="mx-auto h-16 w-16 text-gray-400 mb-4" 
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
          <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link 
            href="/products" 
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => {
                const discountedPrice = item.discount > 0 
                  ? item.price * (1 - item.discount / 100)
                  : item.price;
                
                return (
                  <li key={item._id} className="p-4 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-24 w-24 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="mt-1 flex items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(item.rating)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-1">
                            ({item.numberOfReviews})
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <label htmlFor={`quantity-${item._id}`} className="mr-2 text-sm text-gray-600">
                              Qty:
                            </label>
                            <select
                              id={`quantity-${item._id}`}
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                              className="rounded-md border-gray-300 py-1.5 text-base leading-5 focus:border-green-500 focus:ring-green-500"
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
                              <span className="text-sm text-gray-500 line-through mr-2">
                                ${item.price.toFixed(2)}
                              </span>
                            )}
                            <span className="text-lg font-bold text-green-600">
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
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>${getCartTotal().toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>${getCartTotal().toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-6">
                {!user && (
                  <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-yellow-700 text-sm">
                      Please sign in to complete your purchase.
                    </p>
                  </div>
                )}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors ${
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
                    user ? 'Checkout' : 'Sign in to Checkout'
                  )}
                </button>
              </div>
              <div className="mt-4 text-center">
                <Link href="/products" className="text-sm text-green-600 hover:text-green-700">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 