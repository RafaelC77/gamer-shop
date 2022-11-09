import { client, urlFor } from "../../services/sanity";
import Home, { getStaticProps } from "../../pages";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { CartContextProvider } from "../../contexts/CartContext";
import { Header } from "../../components/Header";

jest.mock("../../services/sanity");

const bannerPropsMock = {
  productName: "Banner Product",
  description: "Description",
  discount: 10,
  fullPrice: 10000,
  largeText: "Large text",
  image: "http://testimage.com",
  slug: "slug",
};

const productsPropsMock = [
  {
    title: "Product Name",
    image: "http://testimage.com",
    price: 10000,
    slug: "slug2",
  },
];

beforeEach(() => {
  const urlForSanityMock = jest.mocked(urlFor);
  const urlMock = jest.fn(() => "http://imageurl.com");

  urlForSanityMock.mockReturnValueOnce({
    url: urlMock,
  } as any);
});

describe("Home Page", () => {
  it("Should render correctly", () => {
    render(<Home banner={bannerPropsMock} products={productsPropsMock} />);

    expect(screen.getByText(/banner product/i)).toBeInTheDocument();
    expect(screen.getByText(/product name/i)).toBeInTheDocument();
  });

  it("Should load initial data", async () => {
    const sanityMock = jest.mocked(client.fetch);

    sanityMock
      .mockResolvedValueOnce([
        {
          product: "product",
          desc: "description",
          discount: 10,
          fullPrice: 100,
          largeText: "large text",
          image: "image",
          slug: {
            current: "slug",
          },
        },
      ] as any)
      .mockResolvedValueOnce([
        {
          name: "name",
          image: ["image-jpg"],
          price: 10,
          slug: { current: "slug" },
        },
      ] as any);

    const response = await getStaticProps();

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          banner: {
            productName: "product",
            description: "description",
            discount: 10,
            fullPrice: 100,
            largeText: "large text",
            image: "image",
            slug: "slug",
          },
          products: [
            {
              title: "name",
              image: "http://imageurl.com",
              price: 10,
              slug: "slug",
            },
          ],
        },
      })
    );
  });

  it("Should add product to cart when user clicks on add button", () => {
    render(
      <CartContextProvider>
        <Header />
        <Home banner={bannerPropsMock} products={productsPropsMock} />
      </CartContextProvider>
    );

    const addToCartButton = screen.getByTestId("add-to-cart-button");

    fireEvent.click(addToCartButton);

    const cartItemsAmount = screen.getByTestId("cart-items-amount");

    expect(cartItemsAmount).toBeVisible();
  });

  it("Should not add product to cart if it's already there", () => {
    render(
      <CartContextProvider>
        <Header />
        <Home banner={bannerPropsMock} products={productsPropsMock} />
      </CartContextProvider>
    );

    const addToCartButton = screen.getByTestId("add-to-cart-button");

    fireEvent.click(addToCartButton);
    fireEvent.click(addToCartButton);

    const cartItemsAmount = screen.getByTestId("cart-items-amount");

    expect(within(cartItemsAmount).getByText("1")).toBeInTheDocument();
  });
});
