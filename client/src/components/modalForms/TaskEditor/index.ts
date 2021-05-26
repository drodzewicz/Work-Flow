export { default } from "./TaskEditor";

export interface TaskEditorProps {
  buttonName: string;
  action: string;
  updateTask?: (data?: any) => void;
    initialValues?: {
        name: string,
        description: string,
        people: any[],
        tags: any[]
  };
  boardId: string;
  taskId?: string;
  columnId: string;
}