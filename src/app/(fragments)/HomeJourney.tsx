import CardJourney from "@/components/Card/CardJourney";
import FadeInSection from "@/components/FadeSection";
import JOURNEY from "@/data/journey";
import React, { ForwardRefRenderFunction, forwardRef } from "react";

interface Props {}

const HomeJourney: ForwardRefRenderFunction<HTMLElement, Props> = (
  props,
  ref
) => {
  return (
    <section ref={ref} className="bg-tertiary pt-[3.85rem] min-h-screen">
      <div className="grid grid-cols-12">
        <div className="col-span-12 xl:col-span-3 bg-primary h-full xl:h-1/3 py-[1.71rem] px-[2.28rem] text-headline-medium md:text-display-medium text-tertiary">
          <FadeInSection type="fade-in">
            <h3 className="font-normal">The</h3>
            <h3 className="font-bold">Journey</h3>
          </FadeInSection>
        </div>
        <div className="col-span-12 xl:col-span-9 overflow-hidden">
          <div className="flex flex-col pt-8">
            {JOURNEY?.map((item) => {
              return (
                <div key={item?.company} className="flex ">
                  <div className="text-body-medium text-secondary mt-2 hidden md:block w-[30%] text-end">
                    <FadeInSection type="fade-in">
                      {item?.duration}
                    </FadeInSection>
                  </div>
                  <div className="hidden md:block bg-secondary h-100 w-1 relative ml-4 mr-4">
                    <div
                      className="bg-secondary h-4 w-4 absolute rounded-xl"
                      style={{ top: -6, left: -6 }}
                    />
                  </div>
                  <div className="md:w-[50%]">
                    <FadeInSection type="fade-in">
                      <CardJourney key={item?.company} item={item} />
                    </FadeInSection>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default forwardRef(HomeJourney);
