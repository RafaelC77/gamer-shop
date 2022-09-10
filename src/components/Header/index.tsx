import { ShoppingCart } from "phosphor-react";
import Link from "next/link";
import Image from "next/future/image";

import logoImage from "../../assets/logo.png";

import styles from "./styles.module.scss";

export function Header() {
  console.log(logoImage);
  return (
    <header className={styles.headerContainer}>
      <div className="container">
        <Link href="/">
          <div className={styles.logoContainer}>
            <Image src={logoImage} className={styles.logo} alt="" />
            <h1>
              Gamer <span>Shop</span>
            </h1>
          </div>
        </Link>

        <Link href="/">
          <div className={styles.cartIconContainer}>
            <ShoppingCart size={24} />
            <span>1</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
