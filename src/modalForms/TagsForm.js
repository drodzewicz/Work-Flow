import React, { useState } from "react";
import Tag from "components/Tag/Tag";

const TagsForm = () => {
  const [tags, setTags] = useState({
    red: "",
    yellow: "",
    green: "test",
    tiel: "",
    purple: "",
    majenta: "mest",
    pink: "1",
  });

  const changeTagNameHandler = (color, newTagName) => {
    console.log(`new val for ${color} is = ${newTagName}`);
  };

  return (
    <div className="tag-form">
      {Object.entries(tags).map(([color, tagName]) => (
        <Tag
          key={color}
          color={color}
          tagName={tagName}
          confirmTagNameChange={changeTagNameHandler}
        />
      ))}
    </div>
  );
};

export default TagsForm;
