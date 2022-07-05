export class WalletError extends Error {
  //based on EIP1193 error spec
  code: number;
  message: string;
  data?: unknown;
  constructor(message: string, code: number, data?: unknown) {
    super();
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
