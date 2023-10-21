import React from "react";

type TaskEditorActionButtonsProps = {
  onCancel?: () => void;
  saveButtonLabel?: string;
};

const TaskEditorActionButtons: React.FC<TaskEditorActionButtonsProps> = ({
  onCancel,
  saveButtonLabel = "save",
}) => {
  return (
    <div className="task-editor__action-buttons">
      <button className="btn btn--glow" type="submit">
        {saveButtonLabel}
      </button>
      <button className="btn" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default TaskEditorActionButtons;
