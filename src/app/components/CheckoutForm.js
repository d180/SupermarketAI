'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

const CheckoutForm = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Name validation (firstName and lastName)
    if (name === 'firstName' || name === 'lastName') {
      // Remove all numbers and special characters, keep only letters, spaces, and hyphens
      processedValue = value.replace(/[^a-zA-Z\s-]/g, '');
      // Remove any multiple spaces
      processedValue = processedValue.replace(/\s+/g, ' ').trim();
      // Capitalize first letter of each word
      processedValue = processedValue.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }

    // Email validation
    if (name === 'email') {
      // Convert to lowercase and remove spaces
      processedValue = value.toLowerCase().trim();
    }

    // Phone number validation - only allow numbers and limit to 10 digits
    if (name === 'phone') {
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    }
    
    // Address validation
    if (name === 'address') {
      // Allow letters, numbers, spaces, and common address characters
      processedValue = value.replace(/[^a-zA-Z0-9\s.,#-]/g, '');
      // Capitalize first letter of each word
      processedValue = processedValue.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }

    // City validation
    if (name === 'city') {
      // Only allow letters, spaces, and hyphens
      processedValue = value.replace(/[^a-zA-Z\s-]/g, '');
      // Capitalize first letter of each word
      processedValue = processedValue.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }

    // State validation
    if (name === 'state') {
      // Only allow letters and spaces
      processedValue = value.replace(/[^a-zA-Z\s]/g, '');
      // Capitalize first letter of each word
      processedValue = processedValue.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }

    // ZIP Code validation
    if (name === 'zipCode') {
      // Only allow numbers and limit to 5 digits
      processedValue = value.replace(/\D/g, '').slice(0, 5);
    }
    
    // Card number validation - only allow numbers and limit to 16 digits
    if (name === 'cardNumber') {
      processedValue = value.replace(/\D/g, '').slice(0, 16);
      // Add space after every 4 digits
      processedValue = processedValue.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    }
    
    // Card name validation
    if (name === 'cardName') {
      // Only allow letters, spaces, and hyphens
      processedValue = value.replace(/[^a-zA-Z\s-]/g, '');
      // Capitalize first letter of each word
      processedValue = processedValue.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    
    // CVV validation - only allow numbers and limit to 3 digits
    if (name === 'cvv') {
      processedValue = value.replace(/\D/g, '').slice(0, 3);
    }
    
    // Expiry date validation - format as MM/YY
    if (name === 'expiryDate') {
      // Remove any non-digit characters
      let digits = value.replace(/\D/g, '');
      
      // Format as MM/YY
      if (digits.length >= 2) {
        let month = parseInt(digits.slice(0, 2));
        // Ensure month is between 01 and 12
        month = Math.min(Math.max(month, 1), 12);
        // Pad with leading zero if needed
        month = month.toString().padStart(2, '0');
        processedValue = month;
        
        if (digits.length > 2) {
          processedValue += '/' + digits.slice(2, 4);
        }
      } else {
        processedValue = digits;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleNext = () => {
    // Validate current step fields
    if (step === 1) {
      // Validate shipping information
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }
    } else if (step === 2) {
      // Validate payment information
      const requiredFields = ['cardNumber', 'cardName', 'expiryDate', 'cvv'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }
    }
    
    setError(null);
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // Process the order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            _id: item._id,
            quantity: item.quantity
          }))
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to process order');
      }

      // Clear the cart after successful order
      clearCart();
      
      // Set order as complete
      setOrderComplete(true);
      
      // Redirect to success page after a delay
      setTimeout(() => {
        router.push('/order-success');
      }, 2000);
    } catch (error) {
      console.error('Error processing order:', error);
      setError(error.message || 'Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="mb-4">
          <svg className="mx-auto h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been received.</p>
        <p className="text-sm text-gray-500 mb-6">Order confirmation has been sent to {formData.email}</p>
        <button
          onClick={() => router.push('/products')}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className="ml-2 text-sm font-medium">Shipping</div>
          </div>
          <div className="flex-1 h-1 mx-4 bg-gray-200">
            <div className="h-1 bg-green-600" style={{ width: `${(step - 1) * 100}%` }}></div>
          </div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <div className="ml-2 text-sm font-medium">Payment</div>
          </div>
          <div className="flex-1 h-1 mx-4 bg-gray-200">
            <div className="h-1 bg-green-600" style={{ width: `${(step - 2) * 100}%` }}></div>
          </div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
            <div className="ml-2 text-sm font-medium">Review</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Shipping Information */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  pattern="[A-Za-z\s-]+"
                  title="Please enter only letters, spaces, and hyphens"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  pattern="[A-Za-z\s-]+"
                  title="Please enter only letters, spaces, and hyphens"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Payment Information */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
                placeholder="1234 5678 9012 3456"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Name on Card</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                  placeholder="MM/YY"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  placeholder="123"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Order Review */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Shipping Information</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-600">
                  {formData.firstName} {formData.lastName}<br />
                  {formData.address}<br />
                  {formData.city}, {formData.state} {formData.zipCode}<br />
                  {formData.country}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Information</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-600">
                  Card ending in {formData.cardNumber.slice(-4)}<br />
                  Expires: {formData.expiryDate}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Order Summary</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item._id} className="flex justify-between">
                      <span className="text-gray-600">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Process Order'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm; 