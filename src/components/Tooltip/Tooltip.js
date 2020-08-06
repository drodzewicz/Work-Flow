import React, { useState } from "react";
import "./Tooltip.scss";

function Tooltip({ text, children }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const toggleShowToolTip = (show) => {
    setShowTooltip(show);
  };
  return (
    <div
      onMouseEnter={() => toggleShowToolTip(true)}
      onMouseLeave={() => toggleShowToolTip(false)}
      className="tool-tip-wrapper"
    >
      {showTooltip && <span className="tooltp">{text}</span>}
      {children}
    </div>
  );
}

export default Tooltip;
