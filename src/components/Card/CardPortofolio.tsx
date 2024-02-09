import Image from "next/image";
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
            <div className="font-bold text-headline-large md:text-display-medium ">{item?.name}</div>
          )}
          <div className="text-body-medium text-secondary mt-2">
            Created at {item?.created_at}
          </div>
          <div className="mt-4 mb-2 text-title-medium">{item?.description}</div>
          <div className="flex flex-wrap gap-2">
            {item?.stacks?.map((val) => {
              return (
                <div
                  key={val}
                  className="px-3 py-2 border border-secondary rounded-lg text-title-small capitalize"
                >
                  {val}
                </div>
              );
            })}
          </div>
        </div>
        {item?.link && (
          <div className="flex">
            <button onClick={() => window.open(item?.link)}>
              Visit Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPortofolio;