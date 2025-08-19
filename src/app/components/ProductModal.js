'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [fact, setFact] = useState('');
  const [isLoadingFact, setIsLoadingFact] = useState(false);
  const { addToCart } = useCart();
  
  const {
    name,
    description,
    price,
    image,
    unit,
    discount,
    rating,
    numberOfReviews,
    stock,
    category,
    subCategory
  } = product;

  const discountedPrice = discount > 0 
    ? price * (1 - discount / 100)
    : price;

  useEffect(() => {
    const fetchFact = async () => {
      try {
        setIsLoadingFact(true);
        const response = await fetch('/api/ai/fact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productName: name }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch fact');
        }

        const data = await response.json();
        setFact(data.fact);
      } catch (error) {
        console.error('Error fetching fact:', error);
      } finally {
        setIsLoadingFact(false);
      }
    };

    fetchFact();
  }, [name]);

  const handleAddToCart = () => {
    // Add the product to cart with the selected quantity
    addToCart({ ...product, quantity });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img 
              src={image} 
              alt={name}
              className="w-full h-96 object-cover"
            />
          </div>
          
          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
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
                ({numberOfReviews} reviews)
              </span>
            </div>

            <p className="text-gray-600 mb-4">{description}</p>

            {/* Random Fact Section */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Did you know?</h3>
              {isLoadingFact ? (
                <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4"></div>
              ) : fact ? (
                <p className="text-sm text-gray-600 italic">"{fact}"</p>
              ) : (
                <p className="text-sm text-gray-500">Loading interesting fact...</p>
              )}
            </div>

            <div className="mb-4">
              <span className="text-sm text-gray-500">Category:</span>
              <span className="ml-2 text-gray-900 capitalize">{category}</span>
            </div>

            <div className="mb-4">
              <span className="text-sm text-gray-500">Sub-category:</span>
              <span className="ml-2 text-gray-900 capitalize">{subCategory}</span>
            </div>

            <div className="mb-4">
              <span className="text-sm text-gray-500">Stock:</span>
              <span className="ml-2 text-gray-900">{stock} {unit}</span>
            </div>

            <div className="mb-6">
              {discount > 0 && (
                <span className="text-sm text-gray-500 line-through mr-2">
                  ${price.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold text-green-600">
                ${discountedPrice.toFixed(2)}/{unit}
              </span>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-sm text-gray-500 mr-2">Quantity:</span>
              <input
                type="number"
                min="1"
                max={stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(Math.max(1, parseInt(e.target.value) || 1), stock))}
                className="w-20 px-3 py-1 border rounded-md"
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 