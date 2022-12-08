import { IconBaseProps } from "react-icons";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function DrawerIcon({
  isOpen,
  className,
  ...props
}: IconBaseProps & { isOpen: boolean }) {
  return (
    <RiArrowDropDownLine
      {...props}
      className={`transition transform ease-in-out ${
        isOpen ? "rotate-180" : "rotate-0"
      } ${className}`}
    />
  );
}
