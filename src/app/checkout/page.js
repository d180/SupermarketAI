'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal } = useCart();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      // Store the current URL to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', '/checkout');
      router.push('/login');
      return;
    }

    // Check if cart is empty
    if (cart.length === 0) {
      router.push('/products');
    } else {
      setLoading(false);
    }
  }, [cart, router, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-4">
                  {cart.map((item) => {
                    const discountedPrice = item.discount > 0 
                      ? item.price * (1 - item.discount / 100)
                      : item.price;
                    
                    return (
                      <div key={item._id} className="flex">
                        <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          <p className="text-sm font-medium text-green-600">
                            ${(discountedPrice * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                    <p>Subtotal</p>
                    <p>${getCartTotal().toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <p>Shipping</p>
                    <p>Free</p>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total</p>
                      <p>${getCartTotal().toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 