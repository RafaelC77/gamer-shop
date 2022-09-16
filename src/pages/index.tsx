import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { Banner } from "../components/Banner";
import { Products } from "../components/Products";
import { client, urlFor } from "../services/sanity";

import styles from "./home.module.scss";
import "react-toastify/dist/ReactToastify.css";

export interface IBanner {
  productName: string;
  description: string;
  discount: number;
  fullPrice: number;
  largeText: string;
  image: string;
  slug: string;
}

export interface IProduct {
  title: string;
  image: string;
  price: number;
  slug: string;
}

interface HomeProps {
  banner: IBanner;
  products: IProduct[];
}

export default function Home({ banner, products }: HomeProps) {
  const {
    productName,
    description,
    discount,
    fullPrice,
    largeText,
    image,
    slug,
  } = banner;

  return (
    <div>
      <Head>
        <title>Home | Gamer Shop </title>
      </Head>

      <main>
        <Banner
          productName={productName}
          description={description}
          discount={discount}
          fullPrice={fullPrice}
          largeText={largeText}
          image={urlFor(image).url()}
          slug={slug}
        />

        <Products products={products} />
      </main>

      <ToastContainer />
    </div>
  );
}

export async function getStaticProps() {
  const bannerQuery = '*[_type == "banner"]';
  const bannerResponse = await client.fetch(bannerQuery);

  const banner = {
    productName: bannerResponse[0].product,
    description: bannerResponse[0].desc,
    discount: bannerResponse[0].discount,
    fullPrice: bannerResponse[0].fullPrice,
    largeText: bannerResponse[0].largeText,
    image: bannerResponse[0].image,
    slug: bannerResponse[0].slug.current,
  };

  const productsQuery = '*[_type == "product"]';
  const productsResponse = await client.fetch(productsQuery);

  const products = productsResponse.map((product: any) => {
    return {
      title: product.name,
      image: urlFor(product.image[0]).url(),
      price: product.price,
      slug: product.slug.current,
    };
  });

  return {
    props: {
      banner,
      products,
    },
    revalidate: 60 * 60, // 1 hour
  };
}
