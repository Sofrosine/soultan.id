import React, { ForwardRefRenderFunction, forwardRef } from "react";

interface Props {}

const HomeFyi: ForwardRefRenderFunction<HTMLElement, Props> = (
  props,
  ref
) => {
  return (
    <section ref={ref} className=" bg-tertiary">
      
    </section>
  );
};

export default forwardRef(HomeFyi);
