import { useContext } from "react";
import { toast } from "react-toastify";

import { CartContext } from "../../contexts/CartContext";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";

import styles from "./CompleteOrderButton.module.scss";

export function CompleteOrderButton() {
  const { shoppingCart } = useContext(CartContext);

  async function handleOrder() {
    const stripe = await getStripeJs();

    try {
      const response = await api.post("/complete-order", shoppingCart);

      stripe?.redirectToCheckout({ sessionId: response.data.id });
    } catch (error) {
      toast.error("Houve um erro ao realizar o pedido!", {
        position: "top-center",
      });
    }
  }

  return (
    <button
      type="button"
      onClick={handleOrder}
      className={styles.completeOrderButton}
      disabled={!shoppingCart.length}
    >
      Finalizar pedido
    </button>
  );
}
