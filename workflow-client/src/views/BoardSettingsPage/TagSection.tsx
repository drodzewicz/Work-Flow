import React, { useState } from "react";

import useBoardId from "@/hooks/useBoardId";
import useModal from "@/hooks/useModal";

import { useCreateTag, useDeleteTag, useGetTags, useUpdateTag } from "@/service/tag";

import Modal from "@/components/layout/Modal";

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
    <section>
      <h2>Tags</h2>
      <hr />
      <button onClick={openCreateNewTagDialog} className="btn">
        Add new tag
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
        <div key={tag._id} style={{ display: "flex" }}>
          <span style={{ width: "1rem", height: "1rem", backgroundColor: tag.key }}></span>
          <span style={{ marginRight: "auto" }}>{tag.name}</span>
          <button className="btn" onClick={() => openEditTagModal(tag)}>
            edit
          </button>
          <button className="btn" onClick={() => deleteTag(tag._id)}>
            delete
          </button>
        </div>
      ))}
    </section>
  );
};

export default TagSection;
