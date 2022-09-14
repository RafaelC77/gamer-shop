import { Minus, Plus } from "phosphor-react";
import styles from "./changeAmountButton.module.scss";

interface ChangeAmountButtonProps {
  itemAmount: number;
  increaseItem: () => void;
  decreaseItem: () => void;
}

export function ChangeAmountButton({
  itemAmount,
  increaseItem,
  decreaseItem,
}: ChangeAmountButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.decrementButton} onClick={decreaseItem}>
        <Minus />
      </button>
      <input
        type="number"
        id="price"
        step={1}
        placeholder={String(itemAmount)}
        readOnly
      />
      <button className={styles.incrementButton} onClick={increaseItem}>
        <Plus />
      </button>
    </div>
  );
}
