import Image from "next/future/image";
import testImage from "../../assets/banner-image.png";
import { ChangeAmountButton } from "../../components/ChangeAmountButton";
import styles from "./product.module.scss";

export default function Product() {
  return (
    <main className={styles.productContainer}>
      <div className={styles.productContent}>
        <div>
          <Image src={testImage} alt="" className={styles.detailImage} />

          <ul className={styles.imagesList}>
            <li>
              <Image src={testImage} alt="" className={styles.smallImage} />
            </li>
            <li>
              <Image src={testImage} alt="" className={styles.smallImage} />
            </li>
            <li>
              <Image src={testImage} alt="" className={styles.smallImage} />
            </li>
            <li>
              <Image src={testImage} alt="" className={styles.smallImage} />
            </li>
          </ul>
        </div>

        <div className={styles.productDetails}>
          <h2>HyperX Cloud Stinger</h2>
          <span>Detalhes:</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            aliquid et excepturi numquam facilis, explicabo beatae culpa
            consequuntur molestiae autem eum temporibus expedita fuga nam!
            Commodi a rerum quaerat recusandae!
          </p>
          <span>R$ 179,99</span>
          <div className={styles.amountInfo}>
            <span>Quantidade: </span>

            <ChangeAmountButton
              coffeeAmount={1}
              decreaseCoffee={() => {}}
              increaseCoffee={() => {}}
            />
          </div>
          <button>Adicione ao carrinho</button>
        </div>
      </div>
    </main>
  );
}
