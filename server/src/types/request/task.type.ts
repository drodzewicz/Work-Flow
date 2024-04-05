export type CreateTaskPayload = {
    title: string;
    description?: string;
    boardId: string;
    columnId: string;
    assignees?: string[];
    tags?: string[];
};

export type UpdateTaskPayload = {
    title: string;
    description: string;
    assignees?: string[];
    tags?: string[];
};

export type MoveTaskPayload = {
    rowIndex: number;
    boardId: string;
    columnId: string;
};
