import React from "react";

import nestedProperty from "nested-property";

import "./ItemContainer.scss";

type ItemContainerProps<T> = {
  items?: T[];
  itemKey: string;
  render: (props: T) => React.ReactNode;
  className?: string;
  noContentMessage?: string;
  maxHeight?: number;
};

function ItemContainer<T = unknown>({
  items,
  render,
  itemKey,
  maxHeight,
  className = "",
  noContentMessage = "Empty",
}: ItemContainerProps<T>) {
  return (
    <div className={`item-container scrollbar ${className}`} style={{ maxHeight }}>
      {items?.map((props) => {
        const elementKey = "item-key-" + nestedProperty.get(props, itemKey);
        return (
          <div key={elementKey} className="item-container__item">
            {render?.(props)}
          </div>
        );
      })}
      {!items?.length && <i className="item-container__no-content-message">{noContentMessage}</i>}
    </div>
  );
}

export default ItemContainer;
