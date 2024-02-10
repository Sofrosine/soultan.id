import CardPortofolio from "@/components/Card/CardPortofolio";
import FadeInSection from "@/components/FadeSection";
import TopBar from "@/components/TopBar";
import PORTOFOLIOS from "@/data/portofolios";
import STACKS from "@/data/stacks";
import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useMemo,
  useState,
} from "react";

interface Props {}

const HomePortofolio: ForwardRefRenderFunction<HTMLElement, Props> = (
  props,
  ref
) => {
  const [selectedVal, setSelectedVal] = useState(STACKS[0]?.value);

  const DATA_PORTOFOLIO = useMemo(() => {
    return PORTOFOLIOS?.filter((item) => item?.main_stack === selectedVal);
  }, [selectedVal]);

  return (
    <section
      ref={ref}
      className="min-h-screen bg-black-text lg:px-[7rem] pt-[2.85rem] overflow-hidden"
    >
      <div className="flex flex-col xl:flex-row xl:items-end gap-4">
        <div className="text-start text-headline-medium md:text-display-medium text-primary font-normal md:font-normal px-4 md:px-[2rem]">
          <h2>Showcasing</h2>
          <h2>
            My Freelance <span className="font-bold">Portofolio</span>
          </h2>
        </div>
        <div className="flex flex-1 pb-2 md:px-[2rem]">
          <TopBar
            data={STACKS}
            onSelect={(item) => setSelectedVal(item?.value)}
          />
        </div>
      </div>
      <div className="flex flex-col pt-8 gap-6 px-4 md:px-[2rem]">
        {DATA_PORTOFOLIO?.map((item, i) => {
          return (
            <FadeInSection
              type={i % 2 ? "fade-in-left" : "fade-in-right"}
              key={item?.name}
            >
              <CardPortofolio item={item} />
            </FadeInSection>
          );
        })}
      </div>
    </section>
  );
};

export default forwardRef(HomePortofolio);
