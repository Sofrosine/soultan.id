import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  item: PortofolioProps;
}

const CardPortofolio: FC<Props> = ({ item }) => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="relative col-span-12 xl:col-span-6 h-[18rem] md:h-[26rem] shadow-md rounded-2xl overflow-hidden">
        <Image className="object-cover" fill alt="" src={item?.image!} />
      </div>
      <div className="pt-4 pb-6 col-span-12 xl:col-span-6 flex flex-col justify-between gap-8">
        <div className="flex flex-col">
          {item?.logo ? (
            <div className="relative h-[32px] w-[240px]">
              <Image src={item?.logo} alt="" fill />
            </div>
          ) : (
            <div className="font-bold text-headline-large md:text-display-medium text-primary">{item?.name}</div>
          )}
          <div className="text-body-medium text-secondary mt-2">
            Created at {item?.created_at}
          </div>
          <div className="mt-4 mb-2 text-title-medium text-primary">{item?.description}</div>
          <div className="flex flex-wrap gap-2">
            {item?.stacks?.map((val) => {
              return (
                <div
                  key={val}
                  className="px-3 py-2 border text-primary border-secondary rounded-lg text-title-small capitalize"
                >
                  {val}
                </div>
              );
            })}
          </div>
        </div>
        {item?.link && (
          <Link target="_blank" href={item?.link} className="flex">
            <button>
              Visit Project
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CardPortofolio;
