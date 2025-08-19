'use client';

import Navbar from '../components/Navbar';
import CachedImage from '@/components/CachedImage';
import Footer from '../components/Footer';

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            About AIStore
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Your trusted partner in providing fresh, quality groceries with the convenience of AI-powered shopping.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At AIStore, we're committed to revolutionizing the grocery shopping experience by combining cutting-edge AI technology with traditional values of quality and service.
              </p>
              <p className="text-lg text-gray-600">
                We believe in making fresh, healthy food accessible to everyone while providing a seamless, personalized shopping experience.
              </p>
            </div>
            <div className="relative">
              <CachedImage 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80&fm=webp&dpr=2"
                alt="Our Store"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-600 text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Freshness</h3>
              <p className="text-gray-600">We prioritize quality and freshness in every product we offer.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-600 text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">Leveraging AI to enhance your shopping experience.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-600 text-4xl mb-4">💚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600">Committed to eco-friendly practices and sustainable sourcing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">A</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Aryan</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">D</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Dhrit</h3>
              <p className="text-gray-600">Head of Operations</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">V</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Varun</h3>
              <p className="text-gray-600">Tech Director</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 