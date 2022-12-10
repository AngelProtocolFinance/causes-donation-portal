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
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsCheck, BsSearch } from "react-icons/bs";

const placeHolderCoin: Coin = {
  decimals: 6,
  min_donation_amnt: 0,
  logo: "",
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
  } = useTokensQuery(props.chainId);

  const {
    setValue,
    formState: { isSubmitting },
  } = useFormContext<T>();

  const {
    field: {
      onChange: onTokenChange,
      value: token = tokens[0] ?? placeHolderCoin,
    },
  } = useController<{ [index: string]: Coin }>({
    name: props.fieldName,
  });

  const [symbol, setSymbol] = useState("");

  const filtered =
    symbol === ""
      ? tokens
      : tokens.filter((t) => {
          return t.symbol.includes(symbol.toLowerCase());
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
                <AiOutlineLoading3Quarters className="animate-spin" />
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
      <Combobox.Options className="z-[1] absolute top-full mt-1 w-full border border-gray-l2 dark:border-bluegray p-1 max-h-60 overflow-y-auto rounded-md bg-gray-l5 dark:bg-blue-d7 shadow-lg focus:outline-none">
        <div className="flex p-2 gap-2 border border-gray-l2 dark:border-bluegray rounded mb-1">
          <BsSearch
            type="Search"
            size={16}
            className="inline -bottom-px relative"
          />
          <Combobox.Input
            placeholder="Search..."
            disabled={tokens.length <= 1}
            className="text-left text-sm focus:outline-none bg-transparent w-20"
            onChange={(event) => setSymbol(event.target.value)}
          />
        </div>
        {filtered.length === 0 && symbol !== "" ? (
          <div className="relative cursor-default select-none py-2 px-4 text-sm">
            {symbol} not found
          </div>
        ) : (
          filtered.map((token) => (
            <Combobox.Option
              key={token.token_id}
              className={
                "flex items-center gap-2 p-3 hover:bg-blue-l4 dark:hover:bg-blue-d5 cursor-pointer"
              }
              value={token}
            >
              {({ selected }) => {
                return (
                  <>
                    <img
                      alt=""
                      src={token.logo}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="text-sm">{token.symbol}</span>
                    {selected && (
                      <BsCheck className="text-green ml-auto" size={20} />
                    )}
                  </>
                );
              }}
            </Combobox.Option>
          ))
        )}
      </Combobox.Options>
    </Combobox>
  );
}
