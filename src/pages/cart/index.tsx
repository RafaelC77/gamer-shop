import Image from "next/future/image";
import Link from "next/link";
import { Trash } from "phosphor-react";
import { useContext } from "react";
import { ChangeAmountButton } from "../../components/ChangeAmountButton";
import { CartContext } from "../../contexts/CartContext";
import { formatPrice } from "../../utils/priceFormatter";
import styles from "./cart.module.scss";

export default function Cart() {
  const { shoppingCart, updateCart } = useContext(CartContext);

  const formattedCart = shoppingCart?.map((item) => {
    return {
      ...item,
      subTotal: item.price * item.amount,
    };
  });

  const total = formattedCart?.reduce((sumTotal, item) => {
    return sumTotal + item.subTotal;
  }, 0);

  const isEmpty = shoppingCart?.length <= 0;

  function handleDecreaseItem(name: string) {
    const newCart = [...shoppingCart];
    const selectedItem = newCart.find((item) => item.name === name);
    const itemIndex = newCart.indexOf(selectedItem);

    if (selectedItem.amount <= 1) {
      return;
    }

    newCart[itemIndex].amount = selectedItem.amount - 1;

    updateCart(newCart);
  }

  function handleIncreaseItem(name: string) {
    const newCart = [...shoppingCart];
    const selectedItem = newCart.find((item) => item.name === name);
    const itemIndex = newCart.indexOf(selectedItem);

    newCart[itemIndex].amount = selectedItem.amount + 1;

    updateCart(newCart);
  }

  function handleRemoveItem(name: string) {
    const previousCart = [...shoppingCart];

    const newCart = previousCart.filter((item) => item.name !== name);

    updateCart(newCart);
  }

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
            {formattedCart?.map((item) => {
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
                      decreaseItem={() => handleDecreaseItem(item.name)}
                      increaseItem={() => handleIncreaseItem(item.name)}
                    />
                  </td>
                  <td>
                    <span>{formatPrice(item.subTotal / 100)}</span>
                  </td>
                  <td>
                    <button onClick={() => handleRemoveItem(item.name)}>
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
        <Link href="/checkout">
          <button disabled={isEmpty}>Finalizar pedido</button>
        </Link>

        <div className={styles.cartTotal}>
          <span>TOTAL</span>
          <strong>{formatPrice(total / 100)}</strong>
        </div>
      </footer>
    </div>
  );
}
