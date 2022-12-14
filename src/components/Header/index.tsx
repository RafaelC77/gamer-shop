import { ShoppingCart } from "phosphor-react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import Image from "next/image";
import logo from "../../assets/gamer-shop-logo.png";

export function Header() {
  const { shoppingCart } = useContext(CartContext);

  const isShoppingCartEmpty = shoppingCart?.length <= 0;
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <a data-testid="link">
            <div className={styles.logoContainer}>
              <Image src={logo} alt="Gamershop" layout="fill" />
            </div>
          </a>
        </Link>

        <Link href="/cart">
          <a data-testid="cart">
            <div className={styles.cartIconContainer}>
              <ShoppingCart size={24} />
              {!isShoppingCartEmpty && (
                <span data-testid="cart-items-amount">
                  {shoppingCart?.length}
                </span>
              )}
            </div>
          </a>
        </Link>
      </div>
    </header>
  );
}
