import { Plus, ShoppingCart } from "phosphor-react";
import Image from "next/future/image";
import styles from "./card.module.scss";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../../../../contexts/CartContext";
import { formatPrice } from "../../../../utils/priceFormatter";
import { toast } from "react-toastify";

interface CardProps {
  title: string;
  image: string;
  price: number;
  slug: string;
}

export function Card({ title, image, price, slug }: CardProps) {
  const { setCartItem } = useContext(CartContext);

  function handleAddItem() {
    setCartItem({ name: title, image, price, amount: 1 });

    toast.success("Item adicionado ao carrinho!", {
      position: "top-right",
    });
  }

  return (
    <li className={styles.cardContainer}>
      <Link href={`/product/${slug}`}>
        <a>
          <Image
            src={image}
            width={240}
            height={240}
            alt=""
            className={styles.productImage}
          />

          <h3>{title}</h3>
        </a>
      </Link>

      <div className={styles.productInfo}>
        <span className={styles.productPrice}>{formatPrice(price / 100)}</span>
        <button onClick={handleAddItem}>
          <Plus />

          <ShoppingCart />
        </button>
      </div>
    </li>
  );
}
