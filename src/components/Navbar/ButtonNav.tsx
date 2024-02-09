import clsx from "clsx";
import { FC } from "react";

interface ButtonNavProps {
  readonly isOpen: boolean;
  readonly onClick: () => void;
}

const ButtonNav: FC<ButtonNavProps> = ({ onClick, isOpen }) => {
  return (
    <div className="w-8 h-8 absolute right-6 hover:cursor-pointer" onClick={onClick}>
      <span
        className={clsx(
          "h-[3px] bg-primary w-8 block absolute transition-all duration-500",
          {
            "-rotate-45 top-4": isOpen,
            "rotate-0 top-1": !isOpen,
          }
        )}
      ></span>
      <span
        className={clsx(
          "h-[3px] bg-primary w-8 block absolute top-3 transition-all duration-500",
          {
            "opacity-0 translate-x-4": isOpen,
            "opacity-100 translate-x-0": !isOpen,
          }
        )}
      ></span>
      <span
        className={clsx(
          "h-[3px] bg-primary w-8 block absolute transition-all duration-500",
          {
            "rotate-45 top-4": isOpen,
            "rotate-0 top-5": !isOpen,
          }
        )}
      ></span>
    </div>
  );
};

export default ButtonNav;
