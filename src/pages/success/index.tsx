import Link from "next/link";
import { Handbag } from "phosphor-react";
import styles from "./styles.module.scss";

export default function Success() {
  return (
    <div className={styles.successContainer}>
      <Handbag weight="fill" size={40} />

      <h2>Agradecemos pela sua compra!</h2>

      <p>O seu recibo foi enviado por e-mail.</p>

      <Link href="/">
        <button>Continuar comprando</button>
      </Link>
    </div>
  );
}
