import Image from "next/future/image";
import { Trash } from "phosphor-react";
import testImage from "../../assets/banner-image.png";
import { ChangeAmountButton } from "../../components/ChangeAmountButton";
import styles from "./cart.module.scss";

export default function Cart() {
  return (
    <div className={styles.cartContainer}>
      <table className={styles.cartItemsTable}>
        <thead>
          <tr>
            <th></th>
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <Image
                src={testImage}
                alt="Título do produto"
                className={styles.cartImage}
              />
            </td>
            <td>
              <span>Título do produto</span>
              <strong>R$ 99,99</strong>
            </td>
            <td>
              <ChangeAmountButton
                coffeeAmount={1}
                decreaseCoffee={() => {}}
                increaseCoffee={() => {}}
              />
            </td>
            <td>
              <span>R$ 99,99</span>
            </td>
            <td>
              <button>
                <Trash weight="fill" size={24} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <footer>
        <button>Finalizar pedido</button>

        <div className={styles.cartTotal}>
          <span>TOTAL</span>
          <strong>R$ 99,99</strong>
        </div>
      </footer>
    </div>
  );
}
