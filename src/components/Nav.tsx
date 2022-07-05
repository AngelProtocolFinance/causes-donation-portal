import angelLogo from "assets/icons/AP-Beta-logo.svg";
import Wallet from "components/Wallet";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between p-4">
      <a
        href="https://www.angelprotocol.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={angelLogo} className="w-32 object-contain" />
      </a>
      <Wallet />
    </nav>
  );
};

export default Nav;
