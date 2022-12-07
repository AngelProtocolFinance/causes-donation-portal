import { Fragment } from "react";
import { Listbox } from "@headlessui/react";
import { WithBalance } from "types";
import { BsChevronDown } from "react-icons/bs";
import toCurrency from "helpers/toCurrency";

type Props = {
  tokens: WithBalance[];
  activeToken: WithBalance;
  setActiveToken: React.Dispatch<React.SetStateAction<WithBalance>>;
};

export default function CurrencyDropdown({
  tokens,
  activeToken,
  setActiveToken,
}: Props) {
  return (
    <Listbox value={activeToken} onChange={setActiveToken}>
      <div className="relative w-full">
        <Listbox.Button className="p-3 flex items-center gap-2 bg-orange-l6 dark:bg-blue-d7 border border-prim rounded w-full">
          <img
            src={activeToken.logo}
            alt=""
            className="w-6 h-6 object-contain"
          />
          <span>{activeToken.symbol}</span>
          <BsChevronDown size={15} className="ml-auto" />
        </Listbox.Button>
        <Listbox.Options className="absolute bg-orange-l6 dark:bg-blue-d7 border border-prim rounded mt-1 w-full py-2">
          {tokens.map((token) => (
            <Listbox.Option key={token.denom} value={token} as={Fragment}>
              {({ active, selected }) =>
                !selected ? (
                  <li
                    className={`p-3 flex items-center gap-2 ${
                      active
                        ? "bg-orange-l4 dark:bg-blue-d5 cursor-pointer"
                        : ""
                    }`}
                  >
                    <img
                      src={token.logo}
                      alt=""
                      className="w-6 h-6 object-contain"
                    />
                    <span>{token.symbol}</span>
                    <span className="text-xs ml-auto">
                      {toCurrency(token.balance, 4)}
                    </span>
                  </li>
                ) : (
                  <></>
                )
              }
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
