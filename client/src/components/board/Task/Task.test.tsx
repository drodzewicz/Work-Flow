import { screen } from "@testing-library/react";
import Task from "./Task";
import {
  renderWithWrappers,
  BrowerRouterWrapper,
  ReactQueryWrapper,
  DragDropWrapper,
  DroppableWrapper,
} from "@/test/utils";

describe("Test Component - Task", () => {
  const render = renderWithWrappers([
    DroppableWrapper,
    DragDropWrapper,
    ReactQueryWrapper,
    BrowerRouterWrapper,
  ]);

  const testTask = {
    id: "test-id",
    title: "test task title",
    cords: { taskIndex: 0, columnIndex: 0 },
    tags: [
      { _id: "tag-1", name: "tag one", key: "#c44242" },
      { _id: "tag-2", name: "tag two", key: "#42c44d" },
      { _id: "tag-3", name: "tag three", key: "#4246c4" },
    ],
    assignees: [
      {
        _id: "user-1",
        username: "user_one",
        name: "user_name_one",
        surname: "user_surname_one",
        email: "user_one@mail.com",
        avatarImageURL: undefined,
      },
      {
        _id: "user-2",
        username: "user_two",
        name: "user_name_two",
        surname: "user_surname_two",
        email: "user_two@mail.com",
        avatarImageURL: undefined,
      },
      {
        _id: "user-3",
        username: "user_three",
        name: "user_name_three",
        surname: "user_surname_three",
        email: "user_three@mail.com",
        avatarImageURL: undefined,
      },
      {
        _id: "user-4",
        username: "user_four",
        name: "user_name_four",
        surname: "user_surname_four",
        email: "user_four@mail.com",
        avatarImageURL: undefined,
      },
      {
        _id: "user-5",
        username: "user_five",
        name: "user_name_five",
        surname: "user_surname_five",
        email: "user_five@mail.com",
        avatarImageURL: undefined,
      },
    ],
  };

  it("should render task title", () => {
    render(
      <Task
        taskId={testTask.id}
        title={testTask.title}
        indexes={testTask.cords}
        tags={testTask.tags}
        assignees={testTask.assignees}
      />,
    );

    expect(screen.queryByText(testTask.title)).toBeInTheDocument();
  });

  it("should render tags", () => {
    render(
      <Task
        taskId={testTask.id}
        title={testTask.title}
        indexes={testTask.cords}
        tags={testTask.tags}
        assignees={testTask.assignees}
      />,
    );

    const tagElements = screen.queryAllByTestId("task-tag");
    expect(tagElements).toHaveLength(testTask.tags.length);

    testTask.tags.forEach((tag) => {
      const tagElement = screen.queryByText(tag.name);
      expect(tagElement).toBeInTheDocument();
    });
  });

  it("should render first three assignee avatars", () => {
    render(
      <Task
        taskId={testTask.id}
        title={testTask.title}
        indexes={testTask.cords}
        tags={testTask.tags}
        assignees={testTask.assignees}
      />,
    );

    const assigneeElements = screen.queryAllByRole("img");
    expect(assigneeElements).toHaveLength(3);
  });

  it("should render overflow chip in assignee row", () => {
    const { rerender } = render(
      <Task
        taskId={testTask.id}
        title={testTask.title}
        indexes={testTask.cords}
        tags={testTask.tags}
        assignees={testTask.assignees}
      />,
    );

    expect(screen.queryByTestId("assignee-overflow-chip")).toHaveTextContent("2");

    rerender(
      <Task
        taskId={testTask.id}
        title={testTask.title}
        indexes={testTask.cords}
        tags={testTask.tags}
        assignees={testTask.assignees.slice(0, 4)}
      />,
    );

    expect(screen.queryByTestId("assignee-overflow-chip")).toHaveTextContent("1");
  });

  it("should not render overflow chip in assignee row when amount of assignees does not overflow (3)", () => {
    render(
      <Task
        taskId={testTask.id}
        title={testTask.title}
        indexes={testTask.cords}
        tags={testTask.tags}
        assignees={testTask.assignees.slice(0, 3)}
      />,
    );

    expect(screen.queryByTestId("assignee-overflow-chip")).not.toBeInTheDocument();
  });
});
