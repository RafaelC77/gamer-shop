import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../../utils/priceFormatter";
import styles from "./Banner.module.scss";

interface BannerProps {
  productName: string;
  description: string;
  discount: number;
  fullPrice: number;
  largeText: string;
  image: string;
}

export function Banner({
  productName,
  description,
  discount,
  fullPrice,
  largeText,
  image,
}: BannerProps) {
  const discountPrice = fullPrice * ((100 - discount) / 100);
  const formattedFullPrice = formatPrice(fullPrice / 100);
  const formattedDiscountPrice = formatPrice(discountPrice / 100);

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerContent}>
        <div className={styles.bannerInfo}>
          <span>{productName}</span>
          <span>
            {discount}% OFF <b>{formattedFullPrice}</b> {formattedDiscountPrice}
          </span>
          <span>{largeText}</span>
          <Link href="/product/hyperx-cloud-stinger">
            <button>Comprar agora</button>
          </Link>
        </div>

        <div className={styles.bannerImageContainer}>
          <Image
            src={image}
            width={500}
            height={500}
            alt=""
            className={styles.bannerImage}
          />
        </div>

        <div className={styles.descriptionContainer}>
          <h2>Descrição</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
