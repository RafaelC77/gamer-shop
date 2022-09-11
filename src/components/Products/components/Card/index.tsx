import { Plus, ShoppingCart } from "phosphor-react";
import Image, { StaticImageData } from "next/future/image";
import styles from "./card.module.scss";

interface CardProps {
  title: string;
  image: StaticImageData;
  price: string;
}

export function Card({ title, image, price }: CardProps) {
  return (
    <li className={styles.cardContainer}>
      <Image src={image} alt="" className={styles.productImage} />

      <h3>{title}</h3>

      <div className={styles.productInfo}>
        <span className={styles.productPrice}>R$ {price}</span>
        <button>
          <Plus />

          <ShoppingCart />
        </button>
      </div>
    </li>
  );
}
