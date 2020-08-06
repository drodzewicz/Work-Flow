import React, { useState } from "react";
import "./Tag.scss";
import PropTypes from "prop-types";
import CheckIcon from "@material-ui/icons/Check";

const Tag = ({ color, tagName, confirmTagNameChange }) => {
  const [tagValue, setTagValue] = useState(tagName);

  const [showCheck, setShowCheck] = useState(false);

  const changeTagHandler = (event) => {
    setTagValue(event.target.value);
  };
  const inputBlurredHandler = () => {
    setTagValue(tagName);
    setShowCheck(false);
  };
  const inputFocusedHandler = () => {
    setShowCheck(true);
  };

  return (
    <div
      className={`tag ${color}`}
      tabIndex="1"
      onBlur={inputBlurredHandler}
      onFocus={inputFocusedHandler}
    >
      <input
        type="text"
        className="tag-input"
        value={tagValue}
        onChange={changeTagHandler}
      />
      {showCheck && (
        <CheckIcon
          onClick={() => {
            confirmTagNameChange(color, tagValue);
            setShowCheck(false);
          }}
          className="tag-check"
        />
      )}
    </div>
  );
};

Tag.propTypes = {
  color: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  confirmTagNameChange: PropTypes.func.isRequired,
};

export default Tag;
