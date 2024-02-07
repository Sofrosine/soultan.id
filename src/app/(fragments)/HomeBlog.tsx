import React, { ForwardRefRenderFunction, forwardRef } from "react";

interface Props {}

const HomeBlog: ForwardRefRenderFunction<HTMLElement, Props> = (
  props,
  ref
) => {
  return (
    <section ref={ref} className="h-screen bg-red-200">
      asldksald
    </section>
  );
};

export default forwardRef(HomeBlog);
