"use client";

import clsx from "clsx";
import React, {
  FC,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

type Props = {
  type?:
    | "fade-in-left"
    | "fade-in-right"
    | "fade-in-down"
    | "fade-in-up"
    | "fade-in";
  children: ReactNode;
  className?: string;
};

const FadeInSection: FC<Props> = (props) => {
  const [isVisible, setVisible] = useState(false);

  const domRef: any = React.useRef();

  useLayoutEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry?.isIntersecting));
    });

    observer.observe(domRef.current);

    return () => observer?.unobserve(domRef.current);
  });

  const getClassAnimation = useMemo(() => {
    switch (props.type) {
      case "fade-in-left":
        return "fade-in-left";
      case "fade-in-right":
        return "fade-in-right";
      case "fade-in-down":
        return "fade-in-down";
      case "fade-in-up":
        return "fade-in-up";
      case "fade-in":
        return "fade-in";

      default:
        return "fade-in-left";
    }
  }, [props.type]);

  return (
    <div
      ref={domRef}
      className={clsx(
        `${getClassAnimation} ${
          isVisible ? "is-visible" : ""
        }  flex flex-col relative`,
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

FadeInSection.defaultProps = {
  type: "fade-in-left",
};

export default FadeInSection;
