import { Card } from "./components/Card";
import productImage from "../../assets/banner-image.png";
import styles from "./Products.module.scss";

export function Products() {
  return (
    <section className={styles.productsContainer}>
      <div className={styles.productsContent}>
        <h2>Produtos</h2>

        <ul className={styles.productsList}>
          <Card
            title="HyperX Cloud Stinger"
            image={productImage}
            price="179,99"
          />
          <Card
            title="HyperX Cloud Stinger"
            image={productImage}
            price="179,99"
          />
          <Card
            title="HyperX Cloud Stinger"
            image={productImage}
            price="179,99"
          />
          <Card
            title="HyperX Cloud Stinger"
            image={productImage}
            price="179,99"
          />
          <Card
            title="HyperX Cloud Stinger"
            image={productImage}
            price="179,99"
          />
          <Card
            title="HyperX Cloud Stinger"
            image={productImage}
            price="179,99"
          />
          <Card
            title="HyperX Cloud Stinger"
            image={productImage}
            price="179,99"
          />
          <Card
            title="HyperX Cloud Stinger"
            image={productImage}
            price="179,99"
          />
        </ul>
      </div>
    </section>
  );
}
