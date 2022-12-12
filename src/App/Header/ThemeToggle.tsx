import { Switch } from "@headlessui/react";

import { useState } from "react";
import { isPrevDark, setToDarkMode, setToLightMode } from "helpers/theme";
import Icon from "components/Icon";

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
      className="ml-2 p-2 rounded-full border border-prim max-sm:text-xs"
    >
      {({ checked }) =>
        checked ? (
          <Icon type="moon" className="text-orange-l2" />
        ) : (
          <Icon type="sun" className="text-orange-l4" />
        )
      }
    </Switch>
  );
}
