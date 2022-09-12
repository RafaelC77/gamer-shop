import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { Banner } from "../components/Banner";
import { Products } from "../components/Products";
import { client, urlFor } from "../services/sanity";

import styles from "./home.module.scss";

export default function Home({
  bannerResponse,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { product, desc, discount, fullPrice, largeText, image } =
    bannerResponse[0];

  console.log(product);
  return (
    <div>
      <Head>
        <title>Home | Gamer Shop </title>
      </Head>

      <main>
        <Banner
          productName={product}
          description={desc}
          discount={discount}
          fullPrice={fullPrice}
          largeText={largeText}
          image={urlFor(image).url()}
        />

        <Products />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const bannerQuery = '*[_type == "banner"]';
  const bannerResponse = await client.fetch(bannerQuery);

  return {
    props: {
      bannerResponse,
    },
    /* revalidate: 60 * 60, // 1 hour */
  };
}
