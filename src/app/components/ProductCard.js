'use client';

import CartButton from './CartButton';
import CachedImage from '@/components/CachedImage';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ product, onClick, onAddToCart }) => {
  const { addToCart } = useCart();
  const {
    name,
    price,
    image,
    unit,
    discount,
    rating,
    numberOfReviews,
    subCategory
  } = product;

  const discountedPrice = discount > 0 
    ? price * (1 - discount / 100)
    : price;

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent the product card click event
    addToCart(product);
    if (onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="relative">
        <CachedImage 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
            {discount}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{name}</h3>
        <div className="mb-2">
          <span className="text-sm text-gray-500">Sub-category:</span>
          <span className="ml-2 text-gray-900 capitalize">{subCategory}</span>
        </div>
        <div className="flex items-center mb-2">
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
            ({numberOfReviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {discount > 0 && (
              <span className="text-sm text-gray-500 line-through mr-2">
                ${price.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-green-600">
              ${discountedPrice.toFixed(2)}/{unit}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors flex items-center gap-1"
          >
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 