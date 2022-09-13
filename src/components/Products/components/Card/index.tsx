import { Plus, ShoppingCart } from "phosphor-react";
import Image from "next/future/image";
import styles from "./card.module.scss";

interface CardProps {
  title: string;
  image: string;
  price: string;
}

export function Card({ title, image, price }: CardProps) {
  return (
    <li className={styles.cardContainer}>
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
    </li>
  );
}
