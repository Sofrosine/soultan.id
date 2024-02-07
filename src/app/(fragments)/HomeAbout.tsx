import FadeInSection from "@/components/FadeSection";
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

  return (
    <section
      ref={ref}
      className="grid grid-cols-12 h-[100vh] bg-white px-[7rem] overflow-hidden"
    >
      <div className="col-span-5 flex flex-col justify-center">
        <FadeInSection type="fade-in-left">
          <h1 className="text-primary text-display-large mb-2">
            Frontend Engineer
          </h1>
          <div className="text-title-large italic text-secondary">
            With highly organized and dedicated personality. Based in Sleman,
            Indonesia
          </div>
        </FadeInSection>
        <div
          onClick={() => onClickDown && onClickDown()}
          className="absolute animate-bounce bottom-4 left-[7rem] h-[4.5rem] w-[2.3rem] hover:cursor-pointer"
        >
          <Image src={"/triple-chevron-pink.svg"} alt="" fill />
        </div>
      </div>
      <AnimatePresence>
        <div className="col-span-7 flex items-center relative">
          <div className="relative flex justify-center h-full w-full">
            <div className="relative h-[80%] w-[90%] animate-spin-slow">
              <Image src={"/hero-bg-circle.png"} alt="hero-bg-circle" fill />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 h-[70%] w-[80%]"
            >
              <Image
                className="object-contain"
                fill
                alt="hero"
                src={"/hero-profile.png"}
              />
            </motion.div>
            <div className="absolute bottom-0 right-8 h-[6rem] w-[12rem]">
              <Image fill alt="hero-circle" src={"/hero-circle.png"} />
            </div>
          </div>
          <div className="flex flex-col gap-6">
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
