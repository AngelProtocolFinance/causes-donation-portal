import { IconBaseProps } from "react-icons";
import Icon from "./Icon";

export default function DrawerIcon({
  isOpen,
  className,
  ...props
}: IconBaseProps & { isOpen: boolean }) {
  return (
    <Icon
      {...props}
      type="dropdown"
      className={`transition transform ease-in-out ${
        isOpen ? "rotate-180" : "rotate-0"
      } ${className}`}
    />
  );
}
