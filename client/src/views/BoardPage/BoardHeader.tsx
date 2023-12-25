import React from "react";

import { FaUsers, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

import useBoardId from "@/hooks/useBoardId";

import ExpandText from "@/components/general/ExpandText";

import Modal from "@/components/layout/Modal";

import BoardMembers from "@/dialogs/BoardMembers";
import useBoolean from "@/hooks/useBoolean";

type BoardHeaderProps = {
  name: string;
  description: string;
};

const BoardHeader: React.FC<BoardHeaderProps> = ({ name, description }) => {
  const boardId = useBoardId();
  const {
    state: showMembersModal,
    setTrue: openMembersModal,
    setFalse: closeMembersModal,
  } = useBoolean(false);

  return (
    <>
      <div>
        <ExpandText className="board-page__title" title={name}>
          <p>{description}</p>
        </ExpandText>
        <div className="board-page__controlls">
          <button className="btn" onClick={openMembersModal}>
            <FaUsers />
            <span>Peolpe</span>
          </button>
          <button className="btn">
            <FaCog />
            <Link to={`/board/${boardId}/settings`}>Settings</Link>
          </button>
        </div>
        <hr className="break-line" style={{ width: "100%" }} />
      </div>
      <Modal show={showMembersModal} title="Members" size="s" onClose={closeMembersModal}>
        <BoardMembers boardId={boardId} />
      </Modal>
    </>
  );
};

export default BoardHeader;
