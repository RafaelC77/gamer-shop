import Image from "next/future/image";
import Head from "next/head";
import bannerImage from "../assets/banner-image.png";

import styles from "./home.module.scss";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home | Gamer Shop </title>
      </Head>

      <main className="container">
        <div className={styles.banner}>
          <div className={styles.bannerInfo}>
            <span>HyperX Cloud Stinger</span>
            <span>Headphone</span>
            <button>Adicione ao carrinho</button>
          </div>

          <div className={styles.bannerImageContainer}>
            <Image src={bannerImage} alt="" className="" />
          </div>

          <div className={styles.descriptionContainer}>
            <h2>Descrição</h2>
            <p>
              Completa e versátil, a linha de headsets Cloud foi projetada para
              as necessidades de qualquer nível de jogador. Independente do seu
              sistema, estilo de jogo e características este headset irá te
              surpreender.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
