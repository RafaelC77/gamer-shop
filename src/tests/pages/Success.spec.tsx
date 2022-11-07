import { render, screen } from "@testing-library/react";
import { CartContextProvider } from "../../contexts/CartContext";
import Success from "../../pages/success";

describe("Success page", () => {
  it("Should render correctly", () => {
    render(
      <CartContextProvider>
        <Success />
      </CartContextProvider>
    );

    expect(
      screen.getByText(/Agradecemos pela sua compra!/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/O seu recibo foi enviado por e-mail./i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /continuar comprando/i,
      })
    ).toBeInTheDocument();
  });
});
