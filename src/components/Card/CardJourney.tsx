import clsx from "clsx";
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  item: JourneyProps;
}

const CardJourney: FC<Props> = ({ item }) => {
  return (
    <div className="flex flex-col px-6 md:px-0 py-[1.71rem]">
      <div
        className={clsx(
          "relative",
          item?.logo?.includes("atech") && "w-[160px] h-[48px]",
          item?.logo?.includes("dagangan") && "w-[200px] h-[48px]",
          item?.logo?.includes("gomodo") && "w-[140px] h-[48px]",
          item?.logo?.includes("fazztrack") && "w-[200px] h-[48px] bg-white"
        )}
      >
        <Image
          src={item?.logo}
          className={
            item?.logo?.includes("gomodo") ? "object-cover" : "object-contain"
          }
          fill
          alt="logo"
        />
      </div>
      <div className="md:hidden text-body-medium text-secondary mt-2">
        {item?.duration}
      </div>
      <div className="text-body-large text-primary mt-2 font-normal mb-2">
        {item?.role} at {item?.company}
      </div>
      <ul className="text-white list-disc list-inside flex flex-col gap-1">
        {item?.description?.map((val) => {
          return (
            <li key={val} className="items-center list-item">
              {val}
            </li>
          );
        })}
      </ul>
      {item?.link && (
        <div className="flex mt-8">
          <button onClick={() => window.open(item?.link)}>Visit Website</button>
        </div>
      )}
    </div>
  );
};

export default CardJourney;
