import { GetStaticProps } from "next";
import Image from "next/future/image";
import { ChangeAmountButton } from "../../components/ChangeAmountButton";
import { client, urlFor } from "../../services/sanity";
import { formatPrice } from "../../utils/priceFormatter";
import styles from "./product.module.scss";

interface ProductProps {
  product: {
    name: string;
    details: string;
    price: number;
    images: string[];
    slug: string;
  };
}

export default function Product({ product }: ProductProps) {
  return (
    <main className={styles.productContainer}>
      <div className={styles.productContent}>
        <div>
          <Image
            src={product.images[0]}
            width={400}
            height={400}
            alt=""
            className={styles.detailImage}
          />

          <ul className={styles.imagesList}>
            {product.images.map((image) => {
              return (
                <li key={image}>
                  <Image
                    src={image}
                    width={64}
                    height={64}
                    alt=""
                    className={styles.smallImage}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.productDetails}>
          <h2>{product.name}</h2>
          <span>Detalhes:</span>
          <p>{product.details}</p>
          <span>{formatPrice(product.price / 100)}</span>
          <div className={styles.amountInfo}>
            <span>Quantidade: </span>

            <ChangeAmountButton
              coffeeAmount={1}
              decreaseCoffee={() => {}}
              increaseCoffee={() => {}}
            />
          </div>
          <button>Adicione ao carrinho</button>
        </div>
      </div>
    </main>
  );
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const response = await client.fetch(query);

  const paths = response.map((product: any) => {
    return {
      params: {
        slug: product.slug.current,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params!;

  const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`;

  const productResponse = await client.fetch(productQuery);

  const product = {
    name: productResponse.name,
    details: productResponse.details,
    price: productResponse.price,
    images: productResponse.image.map((item: any) => urlFor(item).url()),
    slug,
  };

  return {
    props: {
      product,
    },
    /* revalidate: 60 * 60, //1 hour */
  };
};
