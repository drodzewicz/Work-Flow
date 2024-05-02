import React, { PropsWithChildren, useId } from "react";

import "./Skeleton.scss";

type SkeletonContainerProps = {
    element: ((index: number) => React.ReactNode) | React.ReactNode;
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
        <div
            data-testid="skeleton-container"
            className={containerClassName ?? "skeleton-container"}
        >
            {[...Array(count)].map((_, index) => (
                <React.Fragment key={`skeleton-${id}-${index}`}>
                    {typeof element == "function" ? element(index) : element}
                </React.Fragment>
            ))}
        </div>
    );
};

export default SkeletonContainer;
