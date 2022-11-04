import { client, urlFor } from "../../services/sanity";
import { getStaticProps } from "../../pages";

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
});
