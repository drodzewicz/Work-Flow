import React from "react";
import "./TagMini.scss";
import { TagMiniProps } from "./";

const TagMini: React.FC<TagMiniProps> = ({ colorCode }) => {
  return <span className={`tag-mini ${colorCode}`}></span>;
};

export default TagMini;
