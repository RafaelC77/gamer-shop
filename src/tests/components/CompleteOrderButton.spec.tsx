import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "whatwg-fetch";

import { getStripeJs } from "../../services/stripe-js";
import { CartContext } from "../../contexts/CartContext";
import { CompleteOrderButton } from "../../components/CompleteOrderButton";
import { ToastContainer } from "react-toastify";

jest.mock("../../services/stripe-js");

const server = setupServer(
  rest.post("/api/complete-order", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: "responseID", status: "open" }));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("CompleteOrderButton Component", () => {
  it("Should render correctly", () => {
    const cartContextValues = {
      shoppingCart: ["item"],
      setCartItem: jest.fn(),
      updateCart: jest.fn(),
      resetCart: jest.fn(),
    };

    render(
      <CartContext.Provider value={cartContextValues}>
        <CompleteOrderButton />
      </CartContext.Provider>
    );

    expect(
      screen.getByRole("button", {
        name: /finalizar pedido/i,
      })
    ).toBeInTheDocument();
  });

  it("Should be disabled when cart is empty", () => {
    const cartContextValues = {
      shoppingCart: [],
      setCartItem: jest.fn(),
      updateCart: jest.fn(),
      resetCart: jest.fn(),
    };

    render(
      <CartContext.Provider value={cartContextValues}>
        <CompleteOrderButton />
      </CartContext.Provider>
    );

    expect(
      screen.getByRole("button", {
        name: /finalizar pedido/i,
      })
    ).toBeDisabled();
  });

  it("Should redirect to stripe checkout", async () => {
    const cartContextValues = {
      shoppingCart: ["item"],
      setCartItem: jest.fn(),
      updateCart: jest.fn(),
      resetCart: jest.fn(),
    };

    const mockedStripe = jest.mocked(getStripeJs);
    const redirectMock = jest.fn();

    mockedStripe.mockResolvedValueOnce({
      redirectToCheckout: redirectMock,
    } as any);

    render(
      <CartContext.Provider value={cartContextValues}>
        <CompleteOrderButton />
      </CartContext.Provider>
    );

    const completeOrderButton = screen.getByRole("button", {
      name: /finalizar pedido/i,
    });

    fireEvent.click(completeOrderButton);

    await waitFor(() => expect(redirectMock).toBeCalled());
  });

  it("Should show a toast if the api call fails", async () => {
    const cartContextValues = {
      shoppingCart: ["item"],
      setCartItem: jest.fn(),
      updateCart: jest.fn(),
      resetCart: jest.fn(),
    };

    server.use(
      rest.post("/api/complete-order", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json("error"));
      })
    );

    render(
      <CartContext.Provider value={cartContextValues}>
        <CompleteOrderButton />
        <ToastContainer />
      </CartContext.Provider>
    );

    const completeOrderButton = screen.getByRole("button", {
      name: /finalizar pedido/i,
    });

    fireEvent.click(completeOrderButton);

    await waitFor(() =>
      expect(
        screen.getByText("Houve um erro ao realizar o pedido!")
      ).toBeInTheDocument()
    );
  });
});
