import { Combobox } from "@headlessui/react";
import { useState } from "react";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { CoinWithAmount } from "types";
import DrawerIcon from "components/DrawerIcon";
import { BsSearch } from "react-icons/bs";

type BaseFormValue = { [index: string]: CoinWithAmount };

export default function CoinSelector<
  T extends FieldValues,
  K extends Path<T>
>(props: {
  tokens: CoinWithAmount[];
  fieldName: T[K] extends CoinWithAmount ? K : never;
}) {
  const {
    setValue,
    formState: { isSubmitting },
  } = useFormContext<BaseFormValue>();
  const {
    field: { onChange: onTokenChange, value: token },
  } = useController<BaseFormValue>({
    name: props.fieldName,
  });

  const [symbol, setSymbol] = useState("");

  const filtered =
    symbol === ""
      ? props.tokens
      : props.tokens.filter((t) => {
          return t.symbol.includes(symbol.toLowerCase());
        });

  const hasOptions = props.tokens.length > 1;

  return (
    <Combobox
      disabled={!hasOptions || isSubmitting}
      value={token}
      onChange={(token: CoinWithAmount) => {
        onTokenChange(token);
        setValue("coin.amount", token.amount);
      }}
      as="div"
      className="relative"
    >
      <Combobox.Button
        disabled={true}
        className={`flex items-center p-3 bg-orange-l6 dark:bg-blue-d7 rounded w-full gap-2 border border-prim ${
          hasOptions ? "disabled:bg-gray-l2 disabled:dark:bg-bluegray-d1" : ""
        }`}
      >
        {({ open }) => (
          <>
            <img src={token.logo} alt="" className="w-6 h-6 object-contain" />
            <span>{token.symbol}</span>
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
            disabled={props.tokens.length <= 1}
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
              {({ selected }) =>
                !selected ? (
                  <>
                    <img
                      alt=""
                      src={token.logo}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="text-sm">{token.symbol}</span>
                  </>
                ) : (
                  <></>
                )
              }
            </Combobox.Option>
          ))
        )}
      </Combobox.Options>
    </Combobox>
  );
}
