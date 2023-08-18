import React from "react";

import "./Box.scss";

const Box: React.FC<React.ComponentProps<"section">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <section {...props} className={`box ${className || ""}`}>
      {children}
    </section>
  );
};

export default Box;
