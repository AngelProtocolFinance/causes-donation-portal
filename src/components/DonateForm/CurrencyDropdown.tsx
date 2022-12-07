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

export default function MyListbox({
  tokens,
  activeToken,
  setActiveToken,
}: Props) {
  return (
    <Listbox value={activeToken} onChange={setActiveToken}>
      <div className="relative w-full">
        <Listbox.Button className="p-2 text-slate-600 flex items-center gap-2 border border-slate-600/2 w-full">
          <img
            src={activeToken.logo}
            alt=""
            className="w-6 h-6 object-contain"
          />
          <span>{activeToken.symbol}</span>
          <BsChevronDown size={15} className="ml-auto" />
        </Listbox.Button>
        <Listbox.Options className="absolute bg-slate-50 w-full">
          {tokens.map((token) => (
            <Listbox.Option key={token.denom} value={token} as={Fragment}>
              {({ active, selected }) =>
                !selected ? (
                  <li
                    className={`p-2 text-slate-600 flex items-center gap-2 ${
                      active ? "bg-sky-500/10" : ""
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
