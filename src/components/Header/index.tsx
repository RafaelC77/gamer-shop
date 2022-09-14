import { ShoppingCart } from "phosphor-react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

export function Header() {
  const { shoppingCart } = useContext(CartContext);

  const isShoppingCartEmpty = shoppingCart?.length <= 0;
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <a>
            <div className={styles.logoContainer}>
              <h1>
                Gamer<span>Shop</span>
              </h1>
            </div>
          </a>
        </Link>

        <Link href="/cart">
          <a>
            <div className={styles.cartIconContainer}>
              <ShoppingCart size={24} />
              {!isShoppingCartEmpty && <span>{shoppingCart?.length}</span>}
            </div>
          </a>
        </Link>
      </div>
    </header>
  );
}
