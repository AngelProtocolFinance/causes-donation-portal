import { WalletProvider } from "@terra-money/wallet-provider";
import { createRoot } from "react-dom/client";
import { store } from "store";
import { Provider } from "react-redux";

import "./index.css";
import App from "app";
import { initTheme } from "helpers/theme";
import { chainOptions } from "chainOptions";

//set theme immediately, so even suspense loaders and can use it
initTheme();

const root = createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <WalletProvider {...chainOptions}>
      <App />
    </WalletProvider>
  </Provider>
);
