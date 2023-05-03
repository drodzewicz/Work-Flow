import React from "react";

import { TagMiniProps } from "./types";

import "./TagMini.scss";

const TagMini: React.FC<TagMiniProps> = ({ colorCode }) => {
  return <span className={`tag-mini ${colorCode}`}></span>;
};

export default TagMini;
