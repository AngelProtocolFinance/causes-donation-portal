import { angelSocials } from "constants/constants";
import {
  FaTwitter,
  FaMedium,
  FaTelegram,
  FaYoutube,
  FaDiscord,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="container-padded bg-sky-600 p-16 text-slate-50 rounded rounded-b-none">
      <div className="flex gap-4 items-center mb-4">
        <a
          className="hover:text-amber-300"
          target="_blank"
          href={angelSocials.twitter}
        >
          <FaTwitter size={30} />
        </a>
        <a
          className="hover:text-amber-300"
          target="_blank"
          href={angelSocials.telegram}
        >
          <FaTelegram size={30} />
        </a>
        <a
          className="hover:text-amber-300"
          target="_blank"
          href={angelSocials.youtube}
        >
          <FaYoutube size={30} />
        </a>
        <a
          className="hover:text-amber-300"
          target="_blank"
          href={angelSocials.medium}
        >
          <FaMedium size={30} />
        </a>
        <a
          className="hover:text-amber-300"
          target="_blank"
          href={angelSocials.discord}
        >
          <FaDiscord size={30} />
        </a>
      </div>

      <a
        className="block mb-4 hover:text-amber-400"
        href="https://storageapi.fleek.co/57b943eb-ed70-478a-8899-c7859400f77b-bucket/documents/ap-litepaper-v3.pdf"
        target="_blank"
        rel="noreferrer"
      >
        DOWNLOAD LITEPAPER
      </a>
      <p className="text-xs">
        COPYRIGHT 2022 ANGEL PROTOCOL. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
};

export default Footer;
