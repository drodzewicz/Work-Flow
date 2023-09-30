import React, { forwardRef } from "react";

const ColorInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>((props, ref) => {
  const { className, name, ...fieldProps } = props;
  return (
    <div className={`text-field ${className || ""}`}>
      <input ref={ref} {...fieldProps} name={name} type="color" />
      <div className="text-field__line"></div>
    </div>
  );
});

export default ColorInput;
