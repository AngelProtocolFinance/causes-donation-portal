import { Combobox } from "@headlessui/react";
import { useEffect, useState } from "react";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { Coin } from "types";
import DrawerIcon from "components/DrawerIcon";
import { useTokensQuery } from "services/apes";
import placeHolderIcon from "assets/icons/angelwing_bl.png";
import Options from "./Options";
import { PLACEHOLDER_WALLET } from "contexts/WalletGuard";
import Icon from "components/Icon";

export const PLACEHOLDER_COIN: Coin = {
  decimals: 6,
  min_donation_amnt: 0,
  logo: placeHolderIcon,
  symbol: "Select currency",
  token_id: "",
  type: "evm-native",
};

export default function CoinSelector<
  T extends FieldValues,
  K extends Path<T> & keyof T
>(props: {
  fieldName: T[K] extends Coin ? K : never;
  /** to reset amount when changing tokens */
  amountFieldName: Path<T>;
  chainId: string;
}) {
  const {
    setValue,
    formState: { isSubmitting },
  } = useFormContext<T>();

  const {
    field: { onChange: onTokenChange, value: token = PLACEHOLDER_COIN },
  } = useController<{ [index: string]: Coin | undefined }>({
    name: props.fieldName,
  });

  const {
    data: tokens = [],
    isLoading,
    isError,
  } = useTokensQuery(props.chainId, {
    skip: props.chainId === PLACEHOLDER_WALLET.chainId,
  });

  useEffect(() => {
    if (tokens.length > 0) {
      onTokenChange(tokens[0]);
    }
  }, [tokens.length]);

  const hasOptions = tokens.length > 1;

  return (
    <Combobox
      disabled={!hasOptions || isSubmitting || isError}
      value={token}
      onChange={(token: Coin) => {
        onTokenChange(token);
        setValue(props.amountFieldName, "0" as any);
      }}
      by="token_id"
      as="div"
      className="relative"
    >
      <Combobox.Button
        className={`flex items-center p-3 bg-orange-l6 dark:bg-blue-d7 rounded w-full gap-2 border border-prim ${
          hasOptions ? "disabled:bg-gray-l2 disabled:dark:bg-bluegray-d1" : ""
        }`}
      >
        {({ open }) => (
          <>
            {isLoading ? (
              <>
                <Icon type="loading" className="animate-spin" />
                <span>Fetching currency options...</span>
              </>
            ) : isError ? (
              <>
                <Icon type="info" className="text-red" />
                <span className="text-red dark:text-red-l2">
                  Failed to get options
                </span>
              </>
            ) : (
              <>
                <img
                  src={token.logo}
                  alt=""
                  className="w-6 h-6 object-contain"
                />
                <span>{token.symbol}</span>
              </>
            )}
            {!isError && hasOptions && (
              <DrawerIcon isOpen={open} size={30} className="ml-auto" />
            )}
          </>
        )}
      </Combobox.Button>
      <Options tokens={tokens} />
    </Combobox>
  );
}
