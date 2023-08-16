import React from "react";

import { FaUsers, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

import useModal from "@/hooks/useModal";

import Button from "@/components/form/Button";
import ExpandText from "@/components/general/ExpandText";

import Modal from "@/components/layout/Modal";

import BoardMembers from "@/dialogs/BoardMembers";

type BoardHeaderProps = {
  boardId: string;
  name: string;
  description: string;
};

const BoardHeader: React.FC<BoardHeaderProps> = ({ boardId, name, description }) => {
  const { show: showMembersModal, open: openMembersModal, close: closeMembersModal } = useModal();

  return (
    <>
      <div>
        <ExpandText className="board-page__title" title={name}>
          <p>{description}</p>
        </ExpandText>
        <div className="board-page__controlls">
          <Button onClick={openMembersModal}>
            <FaUsers />
            <span>Peolpe</span>
          </Button>
          <Button>
            <FaCog />
            <Link to={`/board/${boardId}/settings`}>Settings</Link>
          </Button>
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
