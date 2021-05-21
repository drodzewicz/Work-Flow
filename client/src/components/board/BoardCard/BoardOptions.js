import React, { useRef, useContext } from "react";
import PropTypes from "prop-types";
import DropdownMenu from "components/general/DropdownMenu/DropdownMenu";
import DropdownMenuItem from "components/general/DropdownMenu/DropdownMenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { leaveBoard, deleteBoard } from "service";
import BoardEditor from "components/modalForms/BoardEditor/BoardEditor";
import { ModalContext } from "context/ModalContext";


const BoardOptions = ({ boardId, removeBoardCallback, isAuthor }) => {
    const moreOptionsAnchor = useRef();
    const [, modalDispatch] = useContext(ModalContext);

    const editEventModal = () => {
        modalDispatch({
          type: "OPEN",
          payload: {
            title: "Edit Board",
            render: <BoardEditor boardId={boardId} submitType="Update" />,
          },
        });
    };

    const leavingEvent = async () => {
        const { error } = await leaveBoard({boardId});
        if (!error) removeBoardCallback(boardId);
    };

    const deleteBoardHandler = async () => {
        const shouldDelete = window.confirm("are you sure you want to delete this board?")
        if (shouldDelete) {
            const { error } = await deleteBoard({boardId});
            if (!error) removeBoardCallback(boardId);
        }

    };

    return (
      <div className="board-options">
        <MoreVertIcon ref={moreOptionsAnchor} />
        <DropdownMenu anchorEl={moreOptionsAnchor}>
          {isAuthor && (
            <DropdownMenuItem>
              <span onClick={editEventModal}>edit</span>
            </DropdownMenuItem>
          )}
          {isAuthor && (
            <DropdownMenuItem>
              <span onClick={deleteBoardHandler}>delete</span>
            </DropdownMenuItem>
          )}
          {!isAuthor && (
            <DropdownMenuItem>
              <span onClick={leavingEvent}>leave</span>
            </DropdownMenuItem>
          )}
        </DropdownMenu>
      </div>
    );
}
BoardOptions.defaultProps = {
    isAuthor: false,
    removeBoardCallback: undefined
}

BoardOptions.propTypes = {
    boardId: PropTypes.string.isRequired,
    removeBoardCallback: PropTypes.func,
    isAuthor: PropTypes.bool
}

export default BoardOptions
