import { getChainOptions, WalletProvider } from "@terra-money/wallet-provider";
import ReactDOM from "react-dom";
import { store } from "store";
import { Provider } from "react-redux";

import "./index.css";
import App from "app";

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <Provider store={store}>
      <WalletProvider {...chainOptions}>
        <App />
      </WalletProvider>
    </Provider>,
    document.getElementById("root")
  );
});
