import { ShoppingCart } from "phosphor-react";
import Link from "next/link";
import Image from "next/future/image";

import logoImage from "../../assets/logo.png";

import styles from "./styles.module.scss";

export function Header() {
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
              <span>1</span>
            </div>
          </a>
        </Link>
      </div>
    </header>
  );
}
