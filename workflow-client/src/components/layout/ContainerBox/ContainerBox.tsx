import React from "react";
import "./ContainerBox.scss";

const ContainerBox: React.FC<React.ComponentProps<"section">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <section {...props} className={`container-box ${className || ""}`}>
      {children}
    </section>
  );
};

export default ContainerBox;
