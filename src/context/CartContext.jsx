
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "tita-wear-cart";
const WISHLIST_STORAGE_KEY = "tita-wear-wishlist";

function readStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() =>
    readStorage(CART_STORAGE_KEY)
  );

  const [wishlistItems, setWishlistItems] = useState(() =>
    readStorage(WISHLIST_STORAGE_KEY)
  );

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  function addToCart(product, size, color, quantity = 1) {
    const key = `${product.id}-${size}-${color}`;

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.key === key
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...currentItems,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          color,
          quantity,
        },
      ];
    });
  }

  function updateQuantity(key, quantity) {
    if (quantity < 1) return;

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.key === key ? { ...item, quantity } : item
      )
    );
  }

  function removeFromCart(key) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.key !== key)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  function toggleWishlist(product) {
    setWishlistItems((currentItems) => {
      const exists = currentItems.some(
        (item) => item.id === product.id
      );

      return exists
        ? currentItems.filter((item) => item.id !== product.id)
        : [...currentItems, product];
    });
  }

  function isInWishlist(productId) {
    return wishlistItems.some((item) => item.id === productId);
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart harus digunakan di dalam CartProvider");
  }

  return context;
}
