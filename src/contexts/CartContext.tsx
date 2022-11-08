import { createContext, ReactNode, useEffect, useRef, useState } from "react";

export interface ICartItem {
  name: string;
  image: string;
  price: number;
  amount: number;
}

interface CartContextType {
  shoppingCart: any[];
  setCartItem: (item: ICartItem) => void;
  updateCart: (newCart: ICartItem[]) => void;
  resetCart: () => void;
}

export const CartContext = createContext({} as CartContextType);

interface CartContextProviderProps {
  children: ReactNode;
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [shoppingCart, setShoppingCart] = useState<ICartItem[]>([]);
  const isMounted = useRef(false);

  useEffect(() => {
    const storedState = localStorage.getItem("@gamer-shop:cart-1.0.0");

    if (storedState) {
      updateCart(JSON.parse(storedState));
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem(
        "@gamer-shop:cart-1.0.0",
        JSON.stringify(shoppingCart)
      );
    } else {
      isMounted.current = true;
    }
  }, [shoppingCart]);

  function setCartItem(newItem: ICartItem) {
    const newCart = [...shoppingCart];

    const itemExists = newCart.find((item) => item.name === newItem.name);

    if (!!itemExists) {
      const itemIndex = newCart.indexOf(itemExists);

      newCart[itemIndex].amount = itemExists.amount + newItem.amount;

      return;
    }

    setShoppingCart((prevState) => [...prevState, { ...newItem }]);
  }

  function updateCart(newCart: ICartItem[]) {
    setShoppingCart(newCart);
  }

  function resetCart() {
    setShoppingCart([]);
  }

  return (
    <CartContext.Provider
      value={{ shoppingCart, setCartItem, updateCart, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
