import clsx from "clsx";
import React, { FC, useState } from "react";

interface Props {
  data: TopBarProps[];
  onSelect: (item: TopBarProps) => void;
}

const TopBar: FC<Props> = ({ data, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-row justify-center xl:justify-start border-b border-primary flex-1 overflow-scroll hide-scrollbar">
      {data?.map((item, i) => {
        return (
          <div key={item?.value} className="flex items-center relative">
            <div
              onClick={() => {
                setActiveIndex(i);
                onSelect && onSelect(item);
              }}
              className="relative px-2 flex justify-center hover:cursor-pointer"
            >
              <div
                className={clsx(
                  "text-body-small md:text-title-small text-primary text-center pb-2 md:pb-0",
                  activeIndex === i && "font-bold"
                )}
              >
                {item?.label}
              </div>
              {activeIndex === i && (
                <div className="hidden xl:block w-full h-[4px] bg-primary absolute -bottom-2 z-50" />
              )}
            </div>
            {i < data?.length - 1 && (
              <div className="text-title-large mx-4 text-secondary">/</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TopBar;
