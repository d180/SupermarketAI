'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useUser();

  // Load cart from localStorage on initial render and when user changes
  useEffect(() => {
    if (user) {
      // If user is logged in, load their cart
      const userCartKey = `cart_${user._id}`;
      const savedCart = localStorage.getItem(userCartKey);
      const tempCart = localStorage.getItem('tempCart');
      
      try {
        let userCart = [];
        if (savedCart) {
          userCart = JSON.parse(savedCart);
        }
        
        // If there's a temporary cart, merge it with user's cart
        if (tempCart) {
          const tempCartItems = JSON.parse(tempCart);
          
          // Create a map of existing items for quick lookup
          const cartMap = new Map(userCart.map(item => [item._id, item]));
          
          // Merge temp cart items with user cart
          tempCartItems.forEach(tempItem => {
            if (cartMap.has(tempItem._id)) {
              // If item exists, update quantity only if temp cart has more items
              const existingItem = cartMap.get(tempItem._id);
              if (tempItem.quantity > existingItem.quantity) {
                existingItem.quantity = tempItem.quantity;
              }
            } else {
              // If item doesn't exist, add it to the map
              cartMap.set(tempItem._id, tempItem);
            }
          });
          
          // Convert map back to array
          const mergedCart = Array.from(cartMap.values());
          setCart(mergedCart);
          
          // Save merged cart and remove temp cart
          localStorage.setItem(userCartKey, JSON.stringify(mergedCart));
          localStorage.removeItem('tempCart');
        } else {
          setCart(userCart);
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem(userCartKey);
        localStorage.removeItem('tempCart');
        setCart([]);
      }
    } else {
      // If user is logged out, load temporary cart
      const tempCart = localStorage.getItem('tempCart');
      if (tempCart) {
        try {
          setCart(JSON.parse(tempCart));
        } catch (error) {
          console.error('Error parsing temp cart:', error);
          localStorage.removeItem('tempCart');
          setCart([]);
        }
      } else {
        setCart([]);
      }
    }
  }, [user]);

  // Save cart to localStorage whenever it changes or user changes
  useEffect(() => {
    if (user) {
      const userCartKey = `cart_${user._id}`;
      localStorage.setItem(userCartKey, JSON.stringify(cart));
    } else if (cart.length > 0) {
      // Save to temporary cart if user is not logged in
      localStorage.setItem('tempCart', JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      
      return [...prevCart, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    if (user) {
      const userCartKey = `cart_${user._id}`;
      localStorage.removeItem(userCartKey);
    } else {
      localStorage.removeItem('tempCart');
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.discount > 0 
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      isAuthenticated: !!user
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 