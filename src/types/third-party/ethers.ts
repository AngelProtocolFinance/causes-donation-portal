import { ethers } from "ethers";
export type {
  TransactionRequest,
  TransactionResponse,
} from "@ethersproject/abstract-provider/src.ts";

class JsonRpcProvider extends ethers.providers.JsonRpcProvider {}
class Web3Provider extends ethers.providers.Web3Provider {}
class EVMContract extends ethers.Contract {}

export { JsonRpcProvider, Web3Provider, EVMContract };
