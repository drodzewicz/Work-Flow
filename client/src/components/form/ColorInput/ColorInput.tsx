import React, { forwardRef } from "react";

import "./ColorInput.scss";

interface ColorInputProps extends React.ComponentProps<"input"> {
    label?: string;
}

const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>((props, ref) => {
    const { className, name, label, ...fieldProps } = props;
    return (
        <div className={`color-input ${className || ""}`}>
            <label>{label}</label>
            <input ref={ref} {...fieldProps} name={name} type="color" />
            <div className="text-field__line"></div>
        </div>
    );
});

export default ColorInput;
