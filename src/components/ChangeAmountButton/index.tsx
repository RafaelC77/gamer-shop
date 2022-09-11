import { Minus, Plus } from "phosphor-react";
import styles from "./changeAmountButton.module.scss";

interface ChangeAmountButtonProps {
  coffeeAmount: number;
  increaseCoffee: () => void;
  decreaseCoffee: () => void;
}

export function ChangeAmountButton({
  coffeeAmount,
  increaseCoffee,
  decreaseCoffee,
}: ChangeAmountButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.decrementButton} onClick={decreaseCoffee}>
        <Minus />
      </button>
      <input
        type="number"
        id="price"
        step={1}
        placeholder={String(coffeeAmount)}
        readOnly
      />
      <button className={styles.incrementButton} onClick={increaseCoffee}>
        <Plus />
      </button>
    </div>
  );
}
