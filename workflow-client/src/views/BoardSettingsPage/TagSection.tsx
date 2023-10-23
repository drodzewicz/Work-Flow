import React, { useState } from "react";

import { FaEdit, FaTag, FaTrash } from "react-icons/fa";

import useBoardId from "@/hooks/useBoardId";
import useModal from "@/hooks/useModal";

import { useCreateTag, useDeleteTag, useGetTags, useUpdateTag } from "@/service/tag";

import Modal from "@/components/layout/Modal";

import TagCard from "@/components/board/TagCard/TagCard";

import TagEditor from "@/dialogs/TagEditor/TagEditor";

const TagSection = () => {
  const boardId = useBoardId();
  const {
    show: showCreateNewTagDialog,
    open: openCreateNewTagDialog,
    close: closeCreateNewTagDialog,
  } = useModal();

  const {
    show: showEditTagDialog,
    open: openEditTagDialog,
    close: closeEditTagDialog,
  } = useModal();

  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const { data: tags = [] } = useGetTags({ boardId });

  const { mutate: deleteTag } = useDeleteTag();
  const { mutate: createTag } = useCreateTag({ boardId });
  const { mutate: updateTag } = useUpdateTag();

  const openEditTagModal = (tag: Tag) => {
    setSelectedTag(tag);
    openEditTagDialog();
  };

  return (
    <section className="board-settings-page__section__tags">
      <button onClick={openCreateNewTagDialog} className="btn btn--glow add-tag-btn">
        <FaTag /> Add new tag
      </button>
      <Modal
        show={showCreateNewTagDialog}
        title="Create new Tag"
        size="s"
        onClose={closeCreateNewTagDialog}
      >
        <TagEditor
          onSubmit={(values) => {
            createTag(values);
            closeCreateNewTagDialog();
          }}
        />
      </Modal>
      <Modal
        show={showEditTagDialog && !!selectedTag}
        title="Edit Tag"
        size="s"
        onClose={closeEditTagDialog}
      >
        <TagEditor
          initialValues={{ key: selectedTag?.key, name: selectedTag?.name }}
          onSubmit={(values) => {
            updateTag({ tagId: selectedTag?._id || "", ...values });
            closeEditTagDialog();
          }}
        />
      </Modal>
      {tags.map((tag) => (
        <div className="settings-tag-card">
          <TagCard color={tag.key} name={tag.name} key={tag._id} />
          <div className="button-group">
            <button title="edit" className="btn" onClick={() => openEditTagModal(tag)}>
              <FaEdit />
            </button>
            <button title="delete" className="btn" onClick={() => deleteTag(tag._id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TagSection;
