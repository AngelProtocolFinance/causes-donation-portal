import { Combobox } from "@headlessui/react";
import Icon from "components/Icon";
import { useState } from "react";
import { Coin } from "types";

export default function Options({ tokens }: { tokens: Coin[] }) {
  const [symbol, setSymbol] = useState("");

  const filtered =
    symbol === ""
      ? tokens
      : tokens.filter((t) => {
          return t.symbol.includes(symbol.toLowerCase());
        });

  return (
    <Combobox.Options className="z-[1] absolute top-full mt-1 w-full border border-gray-l2 dark:border-bluegray p-1 max-h-60 overflow-y-auto rounded-md bg-gray-l5 dark:bg-blue-d7 shadow-lg focus:outline-none scroller">
      <div className="flex p-2 gap-2 border border-gray-l2 dark:border-bluegray rounded mb-1">
        <Icon type="search" size={16} className="inline -bottom-px relative" />
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
            {({ selected }) => (
              <>
                <img
                  alt=""
                  src={token.logo}
                  className="w-6 h-6 object-contain"
                />
                <span className="text-sm">{token.symbol}</span>
                {selected && (
                  <Icon type="check" className="text-green ml-auto" size={20} />
                )}
              </>
            )}
          </Combobox.Option>
        ))
      )}
    </Combobox.Options>
  );
}
