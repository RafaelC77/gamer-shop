import Image from "next/image";
import bannerImage from "../../assets/banner-image.png";
import styles from "./Banner.module.scss";

export function Banner() {
  return (
    <div className="container">
      <div className={styles.bannerContent}>
        <div className={styles.bannerInfo}>
          <span>HyperX Cloud Stinger</span>
          <span>
            44% OFF <b>R$ 381,41</b> R$ 179,99
          </span>
          <span>Headphone</span>
          <button>Adicione ao carrinho</button>
        </div>

        <div className={styles.bannerImageContainer}>
          <Image src={bannerImage} alt="" className={styles.bannerImage} />
        </div>

        <div className={styles.descriptionContainer}>
          <h2>Descrição</h2>
          <p>
            Completa e versátil, a linha de headsets Cloud foi projetada para as
            necessidades de qualquer nível de jogador. Independente do seu
            sistema, estilo de jogo e características este headset irá te
            surpreender.
          </p>
        </div>
      </div>
    </div>
  );
}
