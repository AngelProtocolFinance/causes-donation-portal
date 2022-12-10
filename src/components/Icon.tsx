import { IoMdClose } from "react-icons/io";
import {
  AiOutlineLoading3Quarters,
  AiFillWarning,
  AiOutlineWallet,
} from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsCheck, BsSearch, BsMoonFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import {
  FaTwitter,
  FaMedium,
  FaTelegram,
  FaYoutube,
  FaDiscord,
  FaInfoCircle,
} from "react-icons/fa";
import { IconBaseProps } from "react-icons";

const icons = {
  twitter: FaTwitter,
  medium: FaMedium,
  telegram: FaTelegram,
  youtube: FaYoutube,
  discord: FaDiscord,
  close: IoMdClose,
  info: FaInfoCircle,
  loading: AiOutlineLoading3Quarters,
  check: BsCheck,
  search: BsSearch,
  moon: BsMoonFill,
  sun: FiSun,
  warning: AiFillWarning,
  wallet: AiOutlineWallet,
  dropdown: RiArrowDropDownLine,
} as const;

export default function Icon({
  type,
  ...props
}: IconBaseProps & { type: keyof typeof icons }) {
  const _Icon = icons[type];
  return <_Icon {...props} />;
}
