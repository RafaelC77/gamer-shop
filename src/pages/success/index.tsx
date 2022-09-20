import Link from "next/link";
import { Handbag } from "phosphor-react";
import { useContext, useEffect, useLayoutEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import styles from "./styles.module.scss";

export default function Success() {
  const { resetCart } = useContext(CartContext);

  useEffect(() => {
    resetCart();
  }, []);

  return (
    <div className={styles.successContainer}>
      <div className={styles.successContent}>
        <Handbag weight="fill" size={40} />

        <h2>Agradecemos pela sua compra!</h2>

        <p>O seu recibo foi enviado por e-mail.</p>

        <Link href="/">
          <button>Continuar comprando</button>
        </Link>
      </div>
    </div>
  );
}
