'use client'

import Navbar from './components/Navbar'
import DealsSection from './components/DealsSection'
import SalesSection from './components/SalesSection'
import Link from 'next/link';
import NewItemsSection from './components/NewItemsSection'
import SlidingCart from './components/SlidingCart';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    if (cart.length > 0) {
      setIsCartOpen(true);
    }
  }, [cart.length]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to AIStore
            </h1>
            <p className="text-xl mb-8">
              Your one-stop shop for fresh groceries and amazing deals
            </p>
            <Link href="/products"><button className="bg-white text-green-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Shopping
            </button></Link>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <DealsSection />
      <SalesSection />
      <NewItemsSection />

      {/* Sliding Cart */}
      <SlidingCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-300">
                AIStore is your trusted source for fresh groceries and great deals.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Email: info@aistore.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Grocery St</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; 2024 AIStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
