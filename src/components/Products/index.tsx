import { Card } from "./components/Card";
import styles from "./Products.module.scss";
import { IProduct } from "../../pages";
import { formatPrice } from "../../utils/priceFormatter";

interface ProductsProps {
  products: IProduct[];
}

export function Products({ products }: ProductsProps) {
  return (
    <section className={styles.productsContainer}>
      <div className={styles.productsContent}>
        <h2>Produtos</h2>

        <ul className={styles.productsList}>
          {products.map((product) => {
            return (
              <Card
                key={product.slug}
                title={product.title}
                image={product.image}
                price={formatPrice(product.price / 100)}
                slug={product.slug}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}
