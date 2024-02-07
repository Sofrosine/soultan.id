import Image from "next/image";
import React, { ForwardRefRenderFunction, forwardRef } from "react";

const SOCIAL_MEDIA = [
  {
    logo: "/github.svg",
  },
  {
    logo: "/linkedin.svg",
  },
  {
    logo: "/instagram.svg",
  },
  {
    logo: "/whatsapp.svg",
  },
];

interface Props {}

const HomeAbout: ForwardRefRenderFunction<HTMLElement, Props> = (
  props,
  ref
) => {
  return (
    <section
      ref={ref}
      className="grid grid-cols-12 h-[90vh] bg-white px-[7rem] overflow-hidden"
    >
      <div className="col-span-5 pt-[8rem]">
        <h1 className="text-primary text-display-large mb-2">
          Frontend Engineer
        </h1>
        <div className="text-title-large italic text-secondary">
          With highly organized and dedicated personality. Based in Sleman,
          Indonesia
        </div>
      </div>
      <div className="col-span-7 flex items-center relative">
        <div className="relative flex justify-center h-full w-full">
          <div className="relative h-[80%] w-[90%]">
            <Image src={"/hero-bg-circle.png"} alt="hero-bg-circle" fill />
          </div>
          <div className="absolute bottom-0 h-[90%] w-[80%]">
            <Image
              className="object-contain"
              fill
              alt="hero"
              src={"/hero-profile.png"}
            />
          </div>
          <div className="absolute bottom-0 right-8 h-[6rem] w-[12rem]">
            <Image fill alt="hero-circle" src={"/hero-circle.png"} />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {SOCIAL_MEDIA.map((val) => {
            return (
              <Image
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
    </section>
  );
};

export default forwardRef(HomeAbout);
