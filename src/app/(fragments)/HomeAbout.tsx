import FadeInSection from "@/components/FadeSection";
import useWindowSize from "@/hooks/useWindowSize";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { ForwardRefRenderFunction, forwardRef } from "react";

const SOCIAL_MEDIA = [
  {
    logo: "/github.svg",
    link: "https://github.com/Sofrosine",
  },
  {
    logo: "/linkedin.svg",
    link: "https://www.linkedin.com/in/soultanma/",
  },
  {
    logo: "/instagram.svg",
    link: "https://www.instagram.com/soultan.muh/",
  },
  {
    logo: "/whatsapp.svg",
    link: "https://api.whatsapp.com/send/?phone=6281227711071",
  },
];

interface Props {
  onClickDown: () => void;
}

const HomeAbout: ForwardRefRenderFunction<HTMLElement, Props> = (
  props,
  ref
) => {
  const { onClickDown } = props || {};

  const [, width] = useWindowSize();

  return (
    <section
      ref={ref}
      className="flex flex-col-reverse md:grid md:grid-cols-12 h-[100vh] bg-tertiary px-4 md:px-[2rem] lg:px-[7rem] overflow-hidden"
    >
      <div className="col-span-5 py-4 md:pt-0 h-1/2 md:h-auto flex flex-col justify-start md:justify-center">
        <FadeInSection type="fade-in">
          <h1 className="text-primary z-50 text-headline-large font-bold md:text-display-medium lg:text-display-large mb-2">
            Software Engineer
          </h1>
          <div className="text-title-small z-50 lg:text-title-large text-secondary">
            {`I've contributed to fast-paced environments,
including pre-Series B startups, and have experience working
with a major client from one of the biggest companies in Hong
Kong. I’m dedicated to delivering quality outcomes across all
stages of the product lifecycle.`}
          </div>
          <div className="flex-wrap gap-4 flex md:gap-8 items-center text-secondary mt-8 md:mt-20">
            <div className="flex gap-2 items-center text-secondary animate-pulse">
              <div className="text-headline-large md:text-display-medium">
                4+
              </div>
              <div className="flex flex-col">
                <div>YEARS</div>
                <div>EXPERIENCE</div>
              </div>
            </div>
            <div className="flex gap-2 items-center text-secondary animate-pulse">
              <div className="text-headline-large md:text-display-medium">
                20+
              </div>
              <div className="flex flex-col">
                <div>PROJECTS</div>
                <div>COMPLETED</div>
              </div>
            </div>
          </div>
        </FadeInSection>
        <div
          onClick={() => onClickDown && onClickDown()}
          className={clsx(
            "hidden md:block absolute animate-bounce bottom-4 left-4 md:left-[2rem] lg:left-[7rem] h-[3rem] md:h-[4.5rem] w-[1.5rem] md:w-[2.3rem] hover:cursor-pointer"
          )}
        >
          <Image src={"/triple-chevron-pink.svg"} alt="" fill />
        </div>
      </div>
      <AnimatePresence>
        <div className="col-span-7 h-full md:h-auto flex items-center relative">
          <div className="flex relative justify-center h-full w-full">
            <div className="absolute top-1/3 md:relative h-[60%] lg:h-[80%] w-full lg:w-[90%] animate-spin-slow">
              <Image src={"/hero-bg-circle.png"} alt="hero-bg-circle" fill />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 h-[60%] md:h-[60%] lg:h-[70%] w-full md:w-[70%] lg:w-[80%]"
            >
              <Image
                className="object-contain"
                fill
                alt="hero"
                src={"/hero-profile.png"}
              />
            </motion.div>
            <div className="absolute bottom-0 right-8 md:h-[6rem] md:w-[12rem]">
              <Image fill alt="hero-circle" src={"/hero-circle.png"} />
            </div>
          </div>
          <div className="absolute md:relative right-0 flex flex-col gap-6">
            {SOCIAL_MEDIA.map((val) => {
              return (
                <Image
                  onClick={() => window.open(val?.link)}
                  key={val?.logo}
                  src={val?.logo}
                  alt=""
                  height={40}
                  width={40}
                  className="hover:cursor-pointer"
                />
              );
            })}
          </div>
        </div>
      </AnimatePresence>
    </section>
  );
};

export default forwardRef(HomeAbout);
