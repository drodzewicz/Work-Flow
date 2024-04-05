import React from "react";

const BoardSkeleton: React.FC = () => {
    return (
        <div
            data-testid="skeleton-board-card"
            aria-label="board-card-loading"
            className="board-card--loading"
        >
            <div role="presentation" className="board-card--loading__columns">
                <div className="board-card--loading__columns__column"></div>
                <div className="board-card--loading__columns__column"></div>
                <div className="board-card--loading__columns__column"></div>
                <div className="board-card--loading__columns__column"></div>
            </div>
        </div>
    );
};

export default BoardSkeleton;
