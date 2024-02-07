import useWindowSize from "@/hooks/useWindowSize";
import { FC, useEffect, useRef } from "react";
import { Menu } from ".";
import clsx from "clsx";

interface Props {
  menu: Menu;
  onRender: (renderValue: Menu) => void;
  onClick: () => void;
  className?: string;
}

const NavItem: FC<Props> = ({ menu, onRender, onClick, className }) => {
  const [, width] = useWindowSize();
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    onRender({
      ...menu,
      height: ref.current?.offsetHeight,
      width: ref.current?.offsetWidth,
      left: ref.current?.offsetLeft,
      top: ref.current?.offsetTop,
    });
    console.log(menu.label, ref.current?.offsetLeft, ref.current?.offsetWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRender, width]);

  return (
    <a
      ref={ref}
      key={menu?.label}
      className={clsx(
        "z-10 px-4 py-8 text-title-small font-bold uppercase hover:cursor-pointer",
        menu.active ? "text-primary" : "text-secondary",
        className
      )}
      onClick={onClick}
    >
      {menu?.label}
    </a>
  );
};

export default NavItem;
