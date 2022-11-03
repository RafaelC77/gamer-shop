import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Card } from "../../components/Products/components/Card";
import { CartContext } from "../../contexts/CartContext";

describe("Card component", () => {
  it("Should render correctly", () => {
    render(
      <Card
        title="title"
        image="http://testimage.com/"
        price={10}
        slug="slug"
      />
    );

    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/r\$ 0,10/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Should add product to cart", () => {
    const cartContextValues = {
      shoppingCart: ["item"],
      setCartItem: jest.fn(),
      updateCart: jest.fn(),
      resetCart: jest.fn(),
    };

    render(
      <CartContext.Provider value={cartContextValues}>
        <Card
          title="title"
          image="http://testimage.com/"
          price={10}
          slug="slug"
        />
      </CartContext.Provider>
    );

    const addToCartButton = screen.getByRole("button");

    fireEvent.click(addToCartButton);

    expect(cartContextValues.setCartItem).toBeCalledWith({
      name: "title",
      image: "http://testimage.com/",
      price: 10,
      amount: 1,
    });
  });
});
