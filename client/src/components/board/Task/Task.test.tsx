import { screen } from "@testing-library/react";
import Task from "./Task";
import {
  renderWithWrappers,
  ReactQueryWrapper,
  DragDropWrapper,
  DroppableWrapper,
  createRouteWrapper,
  queryClient,
} from "@/test/utils";

import { tasks } from "@/test/mocks/data";
import { server } from "@/test/mocks/server";

describe("Test Component - Task", () => {
  const testTask = { ...tasks[0], cords: { taskIndex: 0, columnIndex: 0 } };

  const RouteWrapper = createRouteWrapper("/board/:id", "/board/someId123");

  const render = renderWithWrappers([
    DroppableWrapper,
    DragDropWrapper,
    ReactQueryWrapper,
    RouteWrapper,
  ]);

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });

  afterAll(() => {
    server.close();
  });

  it("should render task title", () => {
    render(
      <Task
        taskId={testTask._id}
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
        taskId={testTask._id}
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
        taskId={testTask._id}
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
        taskId={testTask._id}
        title={testTask.title}
        indexes={testTask.cords}
        tags={testTask.tags}
        assignees={testTask.assignees}
      />,
    );

    expect(screen.queryByTestId("assignee-overflow-chip")).toHaveTextContent("2");

    rerender(
      <Task
        taskId={testTask._id}
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
        taskId={testTask._id}
        title={testTask.title}
        indexes={testTask.cords}
        tags={testTask.tags}
        assignees={testTask.assignees.slice(0, 3)}
      />,
    );

    expect(screen.queryByTestId("assignee-overflow-chip")).not.toBeInTheDocument();
  });
});
