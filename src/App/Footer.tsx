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
    <footer className="bg-blue dark:bg-blue-d4 p-16 rounded-md rounded-b-none text-white">
      <div className="container-padded">
        <div className="flex gap-4 items-center mb-4">
          <a
            className="hover:text-orange-l3"
            target="_blank"
            href={angelSocials.twitter}
          >
            <FaTwitter size={25} />
          </a>
          <a
            className="hover:text-orange-l3"
            target="_blank"
            href={angelSocials.telegram}
          >
            <FaTelegram size={25} />
          </a>
          <a
            className="hover:text-orange-l3"
            target="_blank"
            href={angelSocials.youtube}
          >
            <FaYoutube size={32} />
          </a>
          <a
            className="hover:text-orange-l3"
            target="_blank"
            href={angelSocials.medium}
          >
            <FaMedium size={25} />
          </a>
          <a
            className="hover:text-orange-l3"
            target="_blank"
            href={angelSocials.discord}
          >
            <FaDiscord size={30} />
          </a>
        </div>

        <a
          className="block mb-4 hover:text-orange-l3"
          href="https://storageapi.fleek.co/57b943eb-ed70-478a-8899-c7859400f77b-bucket/documents/ap-litepaper-v3.pdf"
          target="_blank"
          rel="noreferrer"
        >
          DOWNLOAD LITEPAPER
        </a>
        <p className="text-xs text-gray-d1 dark:text-gray">
          COPYRIGHT 2022 ANGEL PROTOCOL. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
