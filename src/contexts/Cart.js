import React, { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setTotalAmount(0);
    setTotalCost(0);
    cartItems.forEach(item => {
      setTotalAmount(oldValue => oldValue + item.amount);
      setTotalCost(oldValue => oldValue + (item.amount * item.price));
    });
  }, [cartItems]);

  function addItem(product) {
    setCartItems([...cartItems,
    {
      id: product.id,
      image: product.image,
      name: product.name,
      brand: product.brand,
      price: product.price,
      description: product.description,
      amount: 1
    }
    ])
  }

  function removeItem(id) {
    setCartItems(cartItems.filter(item => item.id !== id));
  }

  function increaseAmount(index) {
    const updItem = [...cartItems];
    updItem[index].amount++;
    setCartItems(updItem);
  }

  function decreaseAmount(index) {
    const updItem = [...cartItems];
    updItem[index].amount--;
    setCartItems(updItem);
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      addItem,
      removeItem,
      increaseAmount,
      decreaseAmount,
      totalAmount,
      totalCost,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext);
}