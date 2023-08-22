import React, { PropsWithChildren, useId } from "react";

import "./Skeleton.scss";

type SkeletonContainerProps = {
  element: React.ReactNode;
  count: number;
  containerClassName?: string;
  show?: boolean;
};

const SkeletonContainer: React.FC<PropsWithChildren<SkeletonContainerProps>> = ({
  element,
  count,
  containerClassName,
  children,
  show = true,
}) => {
  const id = useId();

  if (!show) {
    return <div className={containerClassName ?? ""}>{children}</div>;
  }

  return (
    <div className={containerClassName ?? ""}>
      {[...Array(count)].map((_, index) => (
        <React.Fragment key={`skeleton-${id}-${index}`}>{element}</React.Fragment>
      ))}
    </div>
  );
};

export default SkeletonContainer;
