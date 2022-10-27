import { fireEvent, render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import singletonRouter from "next/router";
import mockRouter from "next-router-mock";

import { Banner } from "../../components/Banner";

jest.mock("next/router", () => require("next-router-mock"));

describe("Banner Component", () => {
  it("should render correctly", () => {
    render(
      <Banner
        description="Banner description"
        discount={10}
        fullPrice={10000}
        image="http://testimage.com/"
        largeText="Large Text"
        productName="Product Name"
        slug="slug"
      />
    );

    expect(screen.getByText("Banner description")).toBeInTheDocument();
    expect(screen.getByText(/10% off/i)).toBeInTheDocument();
    expect(screen.getByText("R$ 100,00")).toBeInTheDocument();
    expect(screen.getByText(/r\$ 90,00/i)).toBeInTheDocument();
    expect(screen.getByText("Large Text")).toBeInTheDocument();
    expect(screen.getByText("Comprar agora")).toBeInTheDocument();
    expect(screen.getByText("Descrição")).toBeInTheDocument();
  });

  it("Should redirect when user clicks on the buy now button", () => {
    mockRouter.setCurrentUrl("/initial");

    render(
      <RouterContext.Provider value={singletonRouter}>
        <Banner
          description="Banner description"
          discount={10}
          fullPrice={10000}
          image="http://testimage.com/"
          largeText="Large Text"
          productName="Product Name"
          slug="slug"
        />
      </RouterContext.Provider>
    );

    const buyNowButton = screen.getByRole("button", {
      name: /comprar agora/i,
    });

    fireEvent.click(buyNowButton);

    expect(singletonRouter).toMatchObject({ asPath: "/product/slug" });
  });
});
