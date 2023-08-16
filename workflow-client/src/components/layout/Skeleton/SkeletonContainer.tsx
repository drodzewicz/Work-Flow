import React, { useId } from "react";

import "./Skeleton.scss";

type SkeletonContainerProps = {
  element: React.ReactNode;
  count: number;
  containerClassName?: string;
  show?: boolean;
  children?: React.ReactNode;
};

const SkeletonContainer: React.FC<SkeletonContainerProps> = ({
  element,
  count,
  containerClassName,
  children,
  show = true,
}) => {
  const id = useId();

  if (!show) {
    return <>{children}</>;
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
