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
  updateCart: (newCart: ICartItem[]) => void;
}

export const CartContext = createContext({} as CartContextType);

interface CartContextProviderProps {
  children: ReactNode;
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [shoppingCart, setShoppingCart] = useState<ICartItem[]>([]);

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

  return (
    <CartContext.Provider value={{ shoppingCart, setCartItem, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}
