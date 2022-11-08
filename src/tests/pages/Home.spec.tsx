import { client, urlFor } from "../../services/sanity";
import Home, { getStaticProps } from "../../pages";
import { render } from "@testing-library/react";
import { CartContext } from "../../contexts/CartContext";
import { Header } from "../../components/Header";

jest.mock("../../services/sanity");

describe("Home Page", () => {
  it("Should load initial data", async () => {
    const sanityMock = jest.mocked(client.fetch);
    const urlForSanityMock = jest.mocked(urlFor);
    const urlMock = jest.fn(() => "http://imageurl.com");

    urlForSanityMock.mockReturnValueOnce({
      url: urlMock,
    } as any);

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

  /*   it("Should get data from local storage then update the cart", () => {
    const banner = {
      productName: "product",
      description: "description",
      discount: 10,
      fullPrice: 100,
      largeText: "large text",
      image: "image",
      slug: "slug",
    };

    const products = [
      {
        title: "name",
        image: "http://imageurl.com",
        price: 10,
        slug: "slug",
      },
    ];

    const updateCartMock = jest.fn();

    const cartContextMock = {
      shoppingCart: [],
      setCartItem: jest.fn(),
      updateCart: updateCartMock,
      resetCart: jest.fn(),
    };

    const urlForSanityMock = jest.mocked(urlFor);
    const urlMock = jest.fn(() => "http://imageurl.com");

    urlForSanityMock.mockReturnValue({
      url: urlMock,
    } as any);

    const storageMock = jest.spyOn(Storage.prototype, "getItem");
    storageMock.mockReturnValue(JSON.stringify({ key: "value" }));

    render(
      <CartContext.Provider value={cartContextMock}>
        <Header />
        <Home banner={banner} products={products} />
      </CartContext.Provider>
    );

    expect(storageMock).toBeCalled();
    expect(updateCartMock).toBeCalled();
  }); */
});
