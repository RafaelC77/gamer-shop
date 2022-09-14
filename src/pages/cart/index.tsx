import Image from "next/future/image";
import { Trash } from "phosphor-react";
import { useContext } from "react";
import testImage from "../../assets/banner-image.png";
import { ChangeAmountButton } from "../../components/ChangeAmountButton";
import { CartContext } from "../../contexts/CartContext";
import { formatPrice } from "../../utils/priceFormatter";
import styles from "./cart.module.scss";

export default function Cart() {
  const { shoppingCart } = useContext(CartContext);

  const formattedCart = shoppingCart.map((item) => {
    return {
      ...item,
      subTotal: item.price * item.amount,
    };
  });

  const total = formattedCart.reduce((sumTotal, item) => {
    return sumTotal + item.subTotal;
  }, 0);

  const isEmpty = shoppingCart.length === 0;

  return (
    <div className={styles.cartContainer}>
      {isEmpty ? (
        <p>Não há itens no carrinho</p>
      ) : (
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
            {formattedCart.map((item) => {
              return (
                <tr key={item.name}>
                  <td>
                    <Image
                      src={item.image}
                      alt="Título do produto"
                      width={96}
                      height={96}
                      className={styles.cartImage}
                    />
                  </td>
                  <td>
                    <span>{item.name}</span>
                    <strong>{formatPrice(item.price / 100)}</strong>
                  </td>
                  <td>
                    <ChangeAmountButton
                      itemAmount={item.amount}
                      decreaseItem={() => {}}
                      increaseItem={() => {}}
                    />
                  </td>
                  <td>
                    <span>{formatPrice(item.subTotal / 100)}</span>
                  </td>
                  <td>
                    <button>
                      <Trash weight="fill" size={24} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <footer>
        <button>Finalizar pedido</button>

        <div className={styles.cartTotal}>
          <span>TOTAL</span>
          <strong>{formatPrice(total / 100)}</strong>
        </div>
      </footer>
    </div>
  );
}
