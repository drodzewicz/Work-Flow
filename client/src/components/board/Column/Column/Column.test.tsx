import { screen } from "@testing-library/react";
import {
  renderWithWrappers,
  ReactQueryWrapper,
  DragDropWrapper,
  DroppableWrapper,
  createRouteWrapper,
} from "@/test/utils";

import Column from "./Column";
import { server } from "@/mocks/server";
import * as useAuthHooks from "@/hooks/useAuth";
import { columnsWithTasks } from "@/test/data";
import { HttpResponse, http } from "msw";
import { Permissions } from "@/hooks/useRBAC";
import { apiURl } from "@/mocks/handlers";
import permissionURL from "@/service/permission/url";
import { PermissionsReposne } from "@/service/permission/useGetCurrentUserBoardRole";
import taskURL from "@/service/task/url";

describe("Test Component - Column", () => {
  const RouteWrapper = createRouteWrapper("/board/:id", "/board/someId123");

  const useAuthSpy = vi.spyOn(useAuthHooks, "useAuth");

  useAuthSpy.mockReturnValue({
    user: {
      username: "test-user",
      _id: "test-user-id",
      email: "test-user@mail.com",
      name: "test name",
      surname: "test surname",
    },
    token: "jwt-token-test",
    login: vi.fn,
    logout: vi.fn,
  });

  const render = renderWithWrappers([
    RouteWrapper,
    DroppableWrapper,
    DragDropWrapper,
    ReactQueryWrapper,
  ]);

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
    useAuthSpy.mockClear();
  });

  it("should render column title", () => {
    const columnTitle = "Test Column title";

    render(<Column columnId="column-id-1" columnName={columnTitle} columnIndex={0} />);

    expect(screen.queryByText(columnTitle)).toBeInTheDocument();
  });

  it("should render number of tasks in the column", async () => {
    const columnIndex = 0;

    render(
      <Column columnId="column-id-1" columnName="Test Column title" columnIndex={columnIndex} />,
    );

    const taskNumber = await screen.findByTestId("column-task-count");
    expect(taskNumber).toHaveTextContent(`${columnsWithTasks[columnIndex].tasks.length}`);
  });

  it("should render all of the tasks in the column", async () => {
    const columnIndex = 0;

    render(
      <Column columnId="column-id-1" columnName="Test Column title" columnIndex={columnIndex} />,
    );

    const taskCards = await screen.findAllByTestId("task-card");
    expect(taskCards).toHaveLength(columnsWithTasks[columnIndex].tasks.length);

    columnsWithTasks[columnIndex].tasks.forEach((task, index) => {
      expect(taskCards[index]).toHaveTextContent(task.title);
    });
  });

  it("should render column options button when user has delete column permission", async () => {
    render(<Column columnId="column-id-1" columnName="Test Column title" columnIndex={0} />);

    expect(await screen.findByTestId("column-option-btn")).toBeInTheDocument();
  });

  // it.skip("should not render column options button when user does not have delete column permission", async () => {
  //   server.resetHandlers(
  //     http.get(apiURl(taskURL.index), () => {
  //       return HttpResponse.json<ColumnWithTasks[]>(columnsWithTasks);
  //     }),
  //     http.get(apiURl(permissionURL.userBoardRole("*", "*")), () => {
  //       return HttpResponse.json<PermissionsReposne>({
  //         permissions: [Permissions.COLUMN_CREATE, Permissions.COLUMN_MOVE],
  //         role: "ADMIN",
  //       });
  //     }),
  //   );

  //   render(<Column columnId="column-id-1" columnName="Test Column title" columnIndex={0} />);

  //   expect(screen.findByTestId("column-option-btn")).rejects.toThrow();
  // });
});
