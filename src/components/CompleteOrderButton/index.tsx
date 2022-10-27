import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./CompleteOrderButton.module.scss";

export function CompleteOrderButton() {
  const { shoppingCart } = useContext(CartContext);

  async function handleOrder() {
    const stripe = await getStripeJs();

    const response = await fetch("/api/complete-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shoppingCart),
    }).then((r) => r.json());

    if (response.status === 500) return;

    stripe?.redirectToCheckout({ sessionId: response.id });
  }

  return (
    <button
      type="button"
      onClick={handleOrder}
      className={styles.completeOrderButton}
      disabled={shoppingCart.length === 0 ? true : false}
    >
      Finalizar pedido
    </button>
  );
}
