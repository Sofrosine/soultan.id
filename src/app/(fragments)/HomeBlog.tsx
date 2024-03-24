import React, { ForwardRefRenderFunction, forwardRef } from "react";

interface Props {}

const HomeBlog: ForwardRefRenderFunction<HTMLElement, Props> = (props, ref) => {
  return (
    <section
      ref={ref}
      className="h-screen bg-tertiary text-display-large text-white overflow-hidden flex justify-center items-center"
    >
      COMING SOON
    </section>
  );
};

export default forwardRef(HomeBlog);
