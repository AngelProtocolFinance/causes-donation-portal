import { Combobox } from "@headlessui/react";
import { useState } from "react";
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
  symbol: "",
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
    data: tokens = [],
    isLoading,
    isError,
  } = useTokensQuery(props.chainId, {
    skip: props.chainId === PLACEHOLDER_WALLET.chainId,
  });

  const {
    setValue,
    formState: { isSubmitting },
  } = useFormContext<T>();

  const {
    field: {
      onChange: onTokenChange,
      value: token = tokens[0] ?? PLACEHOLDER_COIN,
    },
  } = useController<{ [index: string]: Coin }>({
    name: props.fieldName,
  });

  const hasOptions = tokens.length > 1;

  return (
    <Combobox
      disabled={!hasOptions || isSubmitting}
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
            {hasOptions && (
              <DrawerIcon isOpen={open} size={30} className="ml-auto" />
            )}
          </>
        )}
      </Combobox.Button>
      <Options tokens={tokens} />
    </Combobox>
  );
}
