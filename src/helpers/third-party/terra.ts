import { Dec } from "@terra-money/terra.js";

function condenseAmount(rawBalance: string, decimals: number) {
  return new Dec(rawBalance).div(new Dec(10).pow(decimals)).toNumber();
}

function scaleAmount(amount: string, decimals: number) {
  return new Dec(amount).mul(new Dec(10).pow(decimals)).toInt().toString();
}

export { condenseAmount, scaleAmount };
