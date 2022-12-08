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
