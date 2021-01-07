import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { commerce } from "../lib/commerce";

const CartContext = createContext();
const UpdateCartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

export const useUpdateCartContext = () => {
  return useContext(UpdateCartContext);
};

const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    const response = await commerce.cart.retrieve();
    setCart(response);
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={[cart, products,setCart]}>
      <UpdateCartContext.Provider
        value={[fetchProducts, fetchCart, handleAddToCart]}
      >
        {children}
      </UpdateCartContext.Provider>
    </CartContext.Provider>
  );
};

export default CartProvider;
