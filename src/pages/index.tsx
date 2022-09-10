import Head from "next/head";
import { Banner } from "../components/Banner";

import styles from "./home.module.scss";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home | Gamer Shop </title>
      </Head>

      <main className="container">
        <Banner />
      </main>
    </div>
  );
}
