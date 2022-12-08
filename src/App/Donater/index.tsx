import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { ConnectedWallet } from "contexts/WalletContext";
import Form from "./Form";
import { schema } from "./schema";
import { useWalletContext } from "contexts/WalletContext/WalletCtx";
import { chains } from "constants/chains";
import { useBalsQuery } from "services/web3";
import { CoinWithBalance } from "types";
import { ReactElement } from "react";
import Skeleton from "./Skeleton";

export default function Donater() {
  const wallet = useWalletContext();

  if (wallet === "loading") {
    return <Skeleton>Connecting wallet...</Skeleton>;
  } else if (Array.isArray(wallet)) {
    return <Skeleton>Wallet is disconnected</Skeleton>;
  }

  if (!(wallet.chainId in chains)) {
    return <Skeleton>Unsupported network</Skeleton>;
  }

  return (
    <WithBalance {...wallet}>
      {(tokens) => <Context tokens={tokens} />}
    </WithBalance>
  );
}

function Context({ tokens }: { tokens: CoinWithBalance[] }) {
  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      coin: { ...tokens[0], amount: "0" },
      coins: tokens.map((t) => ({ ...t, amount: "0" })),
    },
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

function WithBalance({
  children,
  chainId,
  address,
}: ConnectedWallet & { children(balances: CoinWithBalance[]): ReactElement }) {
  const {
    data: tokens = [],
    isLoading,
    isError,
  } = useBalsQuery({
    ...chains[chainId],
    walletAddr: address,
    id: chainId,
  });

  if (isLoading) return <Skeleton>Fetching balances..</Skeleton>;
  if (isError) return <Skeleton>Failed to get wallet balances</Skeleton>;

  return children(tokens);
}
