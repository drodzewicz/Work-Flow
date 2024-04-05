import React, { MouseEvent } from "react";

import { ReactComponent as Pin } from "@/assets/images/pin-empty.svg";
import { ReactComponent as Pined } from "@/assets/images/pin-full.svg";
import { useNavigate } from "react-router-dom";

import "./BoardCard.scss";

export interface BoardCardProps {
    boardName: string;
    boardId: string;
    isPinned?: boolean;
    pinBoard?: () => void;
}

const BoardCard: React.FC<BoardCardProps> = ({
    boardName,
    boardId,
    pinBoard,
    isPinned = false,
}) => {
    const navigate = useNavigate();

    const togglePinBoard = (e: MouseEvent) => {
        e.stopPropagation();
        pinBoard?.();
    };

    const goToBoard = () => {
        navigate(`/board/${boardId}`);
    };

    const PinIcon = isPinned ? Pined : Pin;

    return (
        <div
            onClick={goToBoard}
            data-testid="board-card"
            aria-label="board-card"
            className="board-card"
        >
            <div role="presentation" className="board-card__foreground">
                <div className="board-card__column"></div>
                <div className="board-card__column"></div>
                <div className="board-card__column"></div>
                <div className="board-card__column"></div>
            </div>
            <div className="board-card__content">
                <div className="board-card__body">
                    <h1 className="board-card__title" title={boardName}>
                        {boardName}
                    </h1>
                </div>
                <div className="board-card__footer">
                    <button
                        data-testid="pin-btn"
                        aria-label={isPinned ? "pinned" : "unpinned"}
                        className="board-card__pin-btn"
                        onClick={togglePinBoard}
                    >
                        <PinIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoardCard;
