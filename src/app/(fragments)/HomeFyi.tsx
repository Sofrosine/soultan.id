import React, { ForwardRefRenderFunction, forwardRef } from "react";

interface Props {}

const HomeFyi: ForwardRefRenderFunction<HTMLElement, Props> = (
  props,
  ref
) => {
  return (
    <section ref={ref} className="h-screen bg-red-200">
      asldksald
    </section>
  );
};

export default forwardRef(HomeFyi);
