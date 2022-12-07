import video from "assets/videos/holdinghands.mp4";
import placeHolderImage from "assets/images/charitable_giving.jpeg";

export type ApesAddressKeys =
  | "atom"
  | "btc"
  | "eth"
  | "ethCharityRelief"
  | "rune"
  | "terra";

export const ApesAddresses: { [key in ApesAddressKeys]: string } = {
  btc: "bc1qezneaj4976ev4kkqws40dk2dxgxwcjynggd8fq",
  eth: "0x5a882Eb704EA153B117Ab2b1797bA46a1B09Da2c",
  ethCharityRelief: "0x8316fAFE131B83Da8fa5fAF1bAbA806950451863",
  terra: "terra1gmxefcqt8sfckw0w44tpkuaz0p27eddq76elzx",
  atom: "cosmos17wp2dr7zrsrrtlz9cn4sxtpsha37dwmwa5n6dr",
  rune: "thor1pnp83jvg2vfpjz7sldxuhgt5frrfm6gzez70cj",
};

export const angelSocials = {
  twitter: "https://twitter.com/angelprotocol",
  medium: "https://angelprotocol.medium.com",
  youtube: "https://www.youtube.com/channel/UCPYj_fooJCfc_tc52rPiw1w",
  telegram: "https://t.me/angelprotocoI",
  discord: "https://discord.com/invite/RhqA652ySA",
};

export const copyAndImages = {
  hero_video: process.env.REACT_APP_HERO_VIDEO ?? video,
  hero_title:
    process.env.REACT_APP_HERO_TITLE ??
    "Angel protocol redefines global impact financing",
  donation_image: process.env.REACT_APP_DONATION_IMAGE ?? placeHolderImage,
  donation_title:
    process.env.REACT_APP_DONATION_TITLE ??
    "Support an impact organization - Angel Protocol",
  donation_subtitle:
    process.env.REACT_APP_DONATION_SUBTITLE ??
    "Angel Protocol provides impact stakeholders with the tools to fundraise, coordinate, and invest capital.",
};
