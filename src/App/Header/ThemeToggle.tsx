import { Switch } from "@headlessui/react";
import { FiSun } from "react-icons/fi";
import { useState } from "react";
import { isPrevDark, setToDarkMode, setToLightMode } from "helpers/theme";
import { BsMoonFill } from "react-icons/bs";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(isPrevDark());

  function toggle(isDark: boolean) {
    if (isDark) {
      setToDarkMode();
    } else {
      setToLightMode();
    }
    setIsDark(isDark);
  }

  return (
    <Switch
      checked={isDark}
      onChange={toggle}
      className="ml-2 p-2 rounded-full border border-prim"
    >
      {({ checked }) =>
        checked ? (
          <BsMoonFill className="text-orange-l4" />
        ) : (
          <FiSun className="text-orange" />
        )
      }
    </Switch>
  );
}
