import angelLogo from "assets/icons/AP-Beta-logo.svg";
import Wallet from "components/Wallet";
import ThemeToggle from "./ThemeToggle";

export default function Header({ classes = "" }) {
  return (
    <div className={`${classes} py-3 bg-transparent`}>
      <div className="flex items-center container-padded">
        <a
          className="mr-auto"
          href="https://www.angelprotocol.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={angelLogo} className="w-32 object-contain" />
        </a>
        <Wallet />
        <ThemeToggle />
      </div>
    </div>
  );
}
