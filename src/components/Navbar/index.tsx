import useWindowSize from "@/hooks/useWindowSize";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CSSProperties, FC, useCallback, useEffect, useState } from "react";
import ButtonNav from "./ButtonNav";
import NavItem from "./NavItem";

export interface Menu {
  label: string;
  link: string;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  active?: boolean;
  entry?: IntersectionObserverEntry;
}

interface Props {
  view: {
    homeView: {
      homeInView: boolean;
      homeEntry?: IntersectionObserverEntry;
    };
    portofolioView: {
      portofolioInView: boolean;
      portofolioEntry?: IntersectionObserverEntry;
    };
    journeyView: {
      journeyInView: boolean;
      journeyEntry?: IntersectionObserverEntry;
    };
    blogView: {
      blogInView: boolean;
      blogEntry?: IntersectionObserverEntry;
    };
    fyiView: {
      fyiInView: boolean;
      fyiEntry?: IntersectionObserverEntry;
    };
  };
}

const Navbar: FC<Props> = ({ view }) => {
  const { homeView, blogView, fyiView, journeyView, portofolioView } =
    view || {};
  const { homeInView, homeEntry } = homeView;
  const { blogInView, blogEntry } = blogView;
  const { fyiInView, fyiEntry } = fyiView;
  const { journeyInView, journeyEntry } = journeyView;
  const { portofolioInView, portofolioEntry } = portofolioView;

  const [show, setShow] = useState(false);

  // const [, width] = useWindowSize();

  const [menu, setMenu] = useState<Menu[]>([
    {
      label: "home",
      link: "#home",
      entry: homeEntry,
      active: true,
    },
    {
      label: "portofolio",
      link: "#portofolio",
      entry: portofolioEntry,
    },
    {
      label: "journey",
      link: "#journey",
      entry: journeyEntry,
    },
    {
      label: "blog",
      link: "#blog",
      entry: blogEntry,
    },
    {
      label: "fyi",
      link: "#fyi",
      entry: fyiEntry,
    },
  ]);
  const [indicator, setIndicator] = useState<CSSProperties>();

  const handleRender = useCallback((menu: Menu) => {
    setMenu((prev) =>
      prev.map((item) => (item.link === menu.link ? menu : item))
    );
  }, []);

  const generateStyle = useCallback(() => {
    const activeMenu = menu.find((v) => v.active);

    if (activeMenu) {
      setIndicator({
        top: 0,
        left: activeMenu?.left || 0,
        width: activeMenu.width,
        height: 8,
      });
    }
  }, [menu]);

  useEffect(() => {
    generateStyle();
    // setIsClient(true);
  }, [generateStyle]);

  useEffect(() => {
    if (homeEntry) {
      setMenu((prev) =>
        prev.map((m) => (m.link === "#home" ? { ...m, entry: homeEntry } : m))
      );
    }

    if (portofolioEntry) {
      setMenu((prev) =>
        prev.map((m) =>
          m.link === "#portofolio" ? { ...m, entry: portofolioEntry } : m
        )
      );
    }

    if (journeyEntry) {
      setMenu((prev) =>
        prev.map((m) =>
          m.link === "#journey" ? { ...m, entry: journeyEntry } : m
        )
      );
    }

    if (blogEntry) {
      setMenu((prev) =>
        prev.map((m) => (m.link === "#blog" ? { ...m, entry: blogEntry } : m))
      );
    }

    if (fyiEntry) {
      setMenu((prev) =>
        prev.map((m) => (m.link === "#fyi" ? { ...m, entry: fyiEntry } : m))
      );
    }
  }, [homeEntry, portofolioEntry, journeyEntry, blogEntry, fyiEntry]);

  useEffect(() => {
    if (homeInView) {
      setMenu((prev) =>
        prev.map((m) =>
          m.link === "#home" ? { ...m, active: true } : { ...m, active: false }
        )
      );
    }

    if (portofolioInView) {
      setMenu((prev) =>
        prev.map((m) =>
          m.link === "#portofolio"
            ? { ...m, active: true }
            : { ...m, active: false }
        )
      );
    }

    if (journeyInView) {
      setMenu((prev) =>
        prev.map((m) =>
          m.link === "#journey"
            ? { ...m, active: true }
            : { ...m, active: false }
        )
      );
    }

    if (blogInView) {
      setMenu((prev) =>
        prev.map((m) =>
          m.link === "#blog" ? { ...m, active: true } : { ...m, active: false }
        )
      );
    }

    if (fyiInView) {
      setMenu((prev) =>
        prev.map((m) =>
          m.link === "#fyi" ? { ...m, active: true } : { ...m, active: false }
        )
      );
    }
  }, [portofolioInView, homeInView, journeyInView, blogInView, fyiInView]);

  return (
    <header>
      <div className="hidden lg:flex fixed top-0 z-50 items-center w-full justify-between px-[4rem] xl:px-[7.42rem] bg-black-text">
        <div>
          <div className="relative w-[153px] h-[40px]">
            <Image fill alt="logo" src={"/logo.svg"} />
          </div>
        </div>
        <nav className="flex z-20 items-center gap-6 relative">
          {menu.map((item) => {
            return (
              <NavItem
                key={item?.label}
                menu={item}
                onRender={handleRender}
                onClick={() => {
                  if (item?.entry) {
                    item?.entry.target.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }}
              />
            );
          })}
          <div
            className="bg-primary absolute transition-all z-50"
            style={indicator}
          />
        </nav>
      </div>
      <div className="block lg:hidden fixed w-full top-0 z-50">
        <div className="flex items-center justify-between bg-black-text p-4 shadow-sm">
          <div className="relative w-[153px] h-[40px]">
            <Image fill alt="logo2" src={"/logo.svg"} />
          </div>
          <ButtonNav isOpen={show} onClick={() => setShow(!show)} />
        </div>
        <AnimatePresence>
          {show && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={clsx(
                "w-full h-screen top-18 flex flex-col absolute z-50 p-2 bg-opacity-[0.07] backdrop-blur-xl"
              )}
            >
              {menu.map((item, i) => (
                <NavItem
                  className={clsx(
                    "text-title-large text-center relative py-4",
                    item?.active ? "text-primary" : "text-black"
                  )}
                  key={i}
                  menu={item}
                  onRender={handleRender}
                  onClick={() => {
                    if (item.entry) {
                      item.entry.target.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }}
                />
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
