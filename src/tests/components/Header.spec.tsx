import { fireEvent, render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import singletonRouter from "next/router";
import mockRouter from "next-router-mock";

import { Header } from "../../components/Header";

jest.mock("next/router", () => require("next-router-mock"));

describe("Header Component", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/initial");
  });

  it("should render correctly", () => {
    render(<Header />);

    expect(screen.getByTestId("link")).toBeInTheDocument();
    expect(screen.getByTestId("cart")).toBeInTheDocument();
  });

  it("Should redirect when user clicks on the home link", () => {
    render(
      <RouterContext.Provider value={singletonRouter}>
        <Header />
      </RouterContext.Provider>
    );

    fireEvent.click(screen.getByTestId("link"));

    expect(singletonRouter).toMatchObject({ asPath: "/" });
  });

  it("Should redirect when user clicks on the cart link", () => {
    render(
      <RouterContext.Provider value={singletonRouter}>
        <Header />
      </RouterContext.Provider>
    );

    fireEvent.click(screen.getByTestId("cart"));

    expect(singletonRouter).toMatchObject({ asPath: "/cart" });
  });
});
