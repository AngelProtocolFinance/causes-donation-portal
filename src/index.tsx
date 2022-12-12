import { WalletProvider } from "@terra-money/wallet-provider";
import { createRoot } from "react-dom/client";
import { store } from "store";
import { Provider } from "react-redux";

import "./index.css";
import App from "App";
import { initTheme } from "helpers/theme";
import { chainOptions } from "chainOptions";
import { Flip, ToastContainer, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Icon from "components/Icon";

//set theme immediately, so even suspense loaders and can use it
initTheme();

const root = createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <WalletProvider {...chainOptions}>
      <ToastContainer
        closeButton={() => (
          <Icon
            type="close"
            className="text-gray-d2 dark:text-white hover:text-orange hover:dark:text-orange pr-1 self-start"
            size={22}
          />
        )}
        toastClassName={(options) =>
          `font-work text-sm bg-white dark:bg-blue-d7 border border-prim flex items-center ${textColor(
            options?.type
          )} p-2 rounded`
        }
        transition={Flip}
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
      <App />
    </WalletProvider>
  </Provider>
);

function textColor(type: TypeOptions | undefined) {
  switch (type) {
    case "info":
      return "text-blue dark:text-blue-l2";
    case "warning":
      return "text-orange-d1 dark:text-orange-l1";
    case "success":
      return "text-green dark:text-green-l2";
    case "error":
      return "text-red dark:text-red-l2";
    default:
      return "text-gray-d2 dark:text-white";
  }
}
