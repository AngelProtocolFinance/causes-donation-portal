import { CountryOption } from "types";

export type PrevTx = { hash: string };

export type FormValues = {
  name: { first: string; last: string };
  address: { street: string; complement: string };
  city: string;
  postalCode: string;
  country: CountryOption;
  state: string;
  email: string;
  hasAgreedToTerms: boolean;
  agreedToGetUpdates: boolean;
};
