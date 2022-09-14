import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import { CartContextProvider } from "../contexts/CartContext";

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Header />
      <Component {...pageProps} />
    </CartContextProvider>
  );
}

export default MyApp;
