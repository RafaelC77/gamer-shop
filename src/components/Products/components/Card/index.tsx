import { Plus, ShoppingCart } from "phosphor-react";
import Image from "next/future/image";
import styles from "./card.module.scss";
import Link from "next/link";

interface CardProps {
  title: string;
  image: string;
  price: string;
  slug: string;
}

export function Card({ title, image, price, slug }: CardProps) {
  return (
    <li>
      <Link href={`/product/${slug}`}>
        <a className={styles.cardContainer}>
          <Image
            src={image}
            width={240}
            height={240}
            alt=""
            className={styles.productImage}
          />

          <h3>{title}</h3>

          <div className={styles.productInfo}>
            <span className={styles.productPrice}>{price}</span>
            <button>
              <Plus />

              <ShoppingCart />
            </button>
          </div>
        </a>
      </Link>
    </li>
  );
}
