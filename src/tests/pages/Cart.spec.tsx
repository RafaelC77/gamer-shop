import { render, screen } from "@testing-library/react";
import { CartContext } from "../../contexts/CartContext";
import Cart from "../../pages/cart";

const cartContextValues = {
  shoppingCart: [
    {
      name: "Product Name",
      image: "http://testimage.com",
      price: 10000,
      amount: 1,
    },
  ],
  setCartItem: jest.fn(),
  updateCart: jest.fn(),
  resetCart: jest.fn(),
};

describe("Cart component", () => {
  it("Should render correctly", () => {
    render(
      <CartContext.Provider value={cartContextValues}>
        <Cart />
      </CartContext.Provider>
    );

    expect(screen.getByText(/product name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /product name/i,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByText("R$ 100,00")[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/1/)).toBeInTheDocument();
  });

  it("Should display the subtotal of the product", () => {
    const product = {
      name: "product",
      image: "http://testimage.com",
      price: 10000,
      amount: 2,
    };

    render(
      <CartContext.Provider
        value={{ ...cartContextValues, shoppingCart: [product] }}
      >
        <Cart />
      </CartContext.Provider>
    );

    expect(screen.getAllByText("R$ 200,00")[0]).toBeInTheDocument();
  });

  it("Should display the total amount of the cart", () => {
    const products = [
      {
        name: "product1",
        image: "http://testimage.com",
        price: 10000,
        amount: 2,
      },
      {
        name: "product2",
        image: "http://testimage.com",
        price: 20000,
        amount: 3,
      },
    ];

    render(
      <CartContext.Provider
        value={{ ...cartContextValues, shoppingCart: products }}
      >
        <Cart />
      </CartContext.Provider>
    );

    expect(screen.getByText("R$ 800,00")).toBeInTheDocument();
  });

  it("Should display a message if cart is empty", () => {
    render(
      <CartContext.Provider value={{ ...cartContextValues, shoppingCart: [] }}>
        <Cart />
      </CartContext.Provider>
    );

    expect(screen.getByText(/não há itens no carrinho/i)).toBeInTheDocument();
  });
});
