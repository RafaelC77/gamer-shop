import { createContext, ReactNode, useState } from "react";

interface ICartItem {
  name: string;
  image: string;
  price: number;
  amount: number;
}

interface CartContextType {
  shoppingCart: any[];
  setCartItem: (item: ICartItem) => void;
}

export const CartContext = createContext({} as CartContextType);

interface CartContextProviderProps {
  children: ReactNode;
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [shoppingCart, setShoppingCart] = useState<ICartItem[]>([]);

  function setCartItem(item: ICartItem) {
    setShoppingCart((prevState) => [...prevState, { ...item }]);
  }

  return (
    <CartContext.Provider value={{ shoppingCart, setCartItem }}>
      {children}
    </CartContext.Provider>
  );
}
