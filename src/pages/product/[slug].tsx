import { GetStaticProps } from "next";
import Image from "next/future/image";
import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ChangeAmountButton } from "../../components/ChangeAmountButton";
import { CartContext } from "../../contexts/CartContext";
import { client, urlFor } from "../../services/sanity";
import { formatPrice } from "../../utils/priceFormatter";
import "react-toastify/dist/ReactToastify.css";
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
  const { setCartItem } = useContext(CartContext);
  const [itemAmount, setItemAmount] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);

  function handleAddItem() {
    setCartItem({
      name: product.name,
      image: product.images[0],
      price: product.price,
      amount: itemAmount,
    });

    toast.success("Item adicionado ao carrinho!", {
      position: "top-right",
    });
  }

  function handleIncreaseItem() {
    setItemAmount((prevState) => prevState + 1);
  }

  function handleDecreaseItem() {
    if (itemAmount <= 1) {
      return;
    }

    setItemAmount((prevState) => prevState - 1);
  }

  return (
    <main className={styles.productContainer}>
      <div className={styles.productContent}>
        <div>
          <Image
            src={selectedImage}
            width={400}
            height={400}
            alt=""
            className={styles.detailImage}
          />

          <ul className={styles.imagesList}>
            {product.images.map((image) => {
              return (
                <li key={image}>
                  <button onClick={() => setSelectedImage(image)}>
                    <Image
                      src={image}
                      width={64}
                      height={64}
                      alt=""
                      className={`${styles.smallImage} ${
                        selectedImage === image ? styles.selectedImage : ""
                      }`}
                    />
                  </button>
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
              itemAmount={itemAmount}
              decreaseItem={handleDecreaseItem}
              increaseItem={handleIncreaseItem}
            />
          </div>
          <button onClick={handleAddItem}>Adicione ao carrinho</button>
        </div>
      </div>
      <ToastContainer />
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
    revalidate: 60 * 60, //1 hour
  };
};
