import React from "react";

import "./ItemContainer.scss";

type ItemContainerProps<T> = {
  items?: T[];
  itemKey: string;
  render?: (props: T) => React.ReactNode;
  className?: string;
  noContentMessage?: string;
  maxHeight?: number;
};

function ItemContainer<T = unknown>({
  items,
  render,
  className,
  itemKey,
  maxHeight,
  noContentMessage = "Empty",
}: ItemContainerProps<T>) {
  return (
    <div className={`item-container ${className || ""}`} style={{ maxHeight }}>
      {items?.map((props) => {
        const elementKey = "item-key-" + (props as any)[`${itemKey}`];
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
