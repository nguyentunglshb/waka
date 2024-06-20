import WithBaseHeader from "@/components/with-base-header";
import React, { FC, PropsWithChildren } from "react";

interface BaseProps extends PropsWithChildren {}

const Base: FC<BaseProps> = ({ children }) => {
  return (
    <>
      <WithBaseHeader />
      {children}
    </>
  );
};

export default Base;
