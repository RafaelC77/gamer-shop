import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { client, urlFor } from "../../services/sanity";
import Product, { getStaticProps } from "../../pages/product/[slug]";
import { CartContext } from "../../contexts/CartContext";
import { ToastContainer } from "react-toastify";

jest.mock("../../services/sanity");

const product = {
  name: "product name",
  details: "product details",
  price: 10000,
  images: ["http://testimage.com"],
  slug: "slug",
};

describe("Product page", () => {
  it("Should render correctly", () => {
    render(<Product product={product} />);

    expect(screen.getByText(/product name/i)).toBeInTheDocument();
    expect(screen.getByText(/product details/i)).toBeInTheDocument();
    expect(screen.getByText(/r\$ 100,00/i)).toBeInTheDocument();
  });

  it("Should load initial data", async () => {
    const sanityClientMocked = jest.mocked(client.fetch);
    const sanityUrlForMocked = jest.mocked(urlFor);
    const urlMock = jest.fn(() => "http://imageurl.com");

    sanityUrlForMocked.mockReturnValue({
      url: urlMock,
    } as any);

    sanityClientMocked.mockReturnValue({
      name: "product name",
      details: "product details",
      price: 10000,
      image: ["image"],
    } as any);

    const response = await getStaticProps({ params: { slug: "slug" } });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            name: "product name",
            details: "product details",
            price: 10000,
            images: ["http://imageurl.com"],
            slug: "slug",
          },
        },
      })
    );
  });

  it("Should change the product amount", () => {
    render(<Product product={product} />);

    const increaseButton = screen.getByTestId("increase-button");
    const decreaseButton = screen.getByTestId("decrease-button");

    fireEvent.click(increaseButton);

    expect(screen.getByRole("spinbutton")).toHaveAttribute("placeholder", "2");

    fireEvent.click(decreaseButton);

    expect(screen.getByRole("spinbutton")).toHaveAttribute("placeholder", "1");
  });

  it("Should change the detail image", async () => {
    const imagesList = ["http://image.com", "http://image2.com"];

    render(
      <Product
        product={{
          ...product,
          images: imagesList,
        }}
      />
    );

    const secondImage = screen.getAllByRole("img")[2];

    fireEvent.click(secondImage);

    const detailImage = screen.getAllByRole("img")[0];

    await waitFor(() => {
      expect(detailImage).toHaveAttribute(
        "src",
        expect.stringContaining("image2")
      );
    });
  });

  it("Should add product to cart when user clicks on add to cart button", () => {
    const setCartItemMock = jest.fn();
    const cartContextMock = {
      shoppingCart: [],
      setCartItem: setCartItemMock,
      updateCart: jest.fn(),
      resetCart: jest.fn(),
    };

    render(
      <CartContext.Provider value={cartContextMock}>
        <Product product={product} />
      </CartContext.Provider>
    );

    const addToCartButton = screen.getByRole("button", {
      name: /adicione ao carrinho/i,
    });

    fireEvent.click(addToCartButton);

    expect(setCartItemMock).toBeCalled();
  });

  it("Should show a toast if product is added", async () => {
    const cartContextMock = {
      shoppingCart: [],
      setCartItem: jest.fn(),
      updateCart: jest.fn(),
      resetCart: jest.fn(),
    };

    render(
      <CartContext.Provider value={cartContextMock}>
        <Product product={product} />
        <ToastContainer />
      </CartContext.Provider>
    );

    const addToCartButton = screen.getByRole("button", {
      name: /adicione ao carrinho/i,
    });

    fireEvent.click(addToCartButton);

    await waitFor(() =>
      expect(
        screen.getAllByText("Item adicionado ao carrinho!")[0]
      ).toBeInTheDocument()
    );
  });
});
