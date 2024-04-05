import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import {
    renderWithWrappers,
    ReactQueryWrapper,
    DragDropWrapper,
    DroppableWrapper,
    createRouteWrapper,
    queryClient,
    apiURl,
} from "@/test/utils";

import Column from "./Column";
import { server } from "@/test/mocks/server";
import * as useAuthHooks from "@/hooks/useAuth";
import { columnsWithTasks } from "@/test/mocks/data";
import { HttpResponse, http } from "msw";
import { Permissions } from "@/hooks/useRBAC";
import permissionURL from "@/service/permission/url";
import { users } from "@/test/mocks/data";

describe("Test Component - Column", () => {
    const RouteWrapper = createRouteWrapper("/board/:id", "/board/someId123");

    const useAuthSpy = vi.spyOn(useAuthHooks, "useAuth");

    useAuthSpy.mockReturnValue({
        user: users[0],
        token: "jwt-token-test",
        login: vi.fn,
        logout: vi.fn,
    });

    // eslint-disable-next-line testing-library/render-result-naming-convention
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
        queryClient.clear();
    });

    afterAll(() => {
        server.close();
        useAuthSpy.mockClear();
    });

    it("should render column title", () => {
        const columnTitle = "Test Column title";

        render(<Column columnId="column-id-1" columnName={columnTitle} columnIndex={0} />);

        expect(screen.getByText(columnTitle)).toBeInTheDocument();
    });

    it("should double click on title and activate input", async () => {
        const columnTitle = "Test Column title";

        render(<Column columnId="column-id-1" columnName={columnTitle} columnIndex={0} />);

        const titleElement = screen.getByText(columnTitle);

        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();

        await userEvent.dblClick(titleElement);

        const inputElement = screen.queryByRole("textbox");
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue(columnTitle);
    });

    it("should change value in the editable title input", async () => {
        const columnTitle = "Test Column title";
        const testValue = "plus something";

        render(<Column columnId="column-id-1" columnName={columnTitle} columnIndex={0} />);

        const titleElement = screen.getByText(columnTitle);

        await userEvent.dblClick(titleElement);

        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toHaveValue(columnTitle);

        await userEvent.type(inputElement, testValue);
        expect(inputElement).toHaveValue(columnTitle + testValue);
    });

    it("should render number of tasks in the column", async () => {
        const columnIndex = 0;

        render(
            <Column
                columnId="column-id-1"
                columnName="Test Column title"
                columnIndex={columnIndex}
            />
        );

        const taskNumber = await screen.findByTestId("column-task-count");
        expect(taskNumber).toHaveTextContent(`${columnsWithTasks[columnIndex].tasks.length}`);
    });

    it("should render all of the tasks in the column", async () => {
        const columnIndex = 0;

        render(
            <Column
                columnId="column-id-1"
                columnName="Test Column title"
                columnIndex={columnIndex}
            />
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

    it("should not render column options button when user does not have delete column permission", async () => {
        server.use(
            http.get(apiURl(permissionURL.userBoardRole("*", "*")), () => {
                return HttpResponse.json({
                    permissions: [
                        Permissions.TASK_CREATE,
                        Permissions.TASK_DELETE,
                        Permissions.TASK_MOVE,
                        Permissions.COLUMN_CREATE,
                        Permissions.COLUMN_MOVE,
                    ],
                    role: "ADMIN",
                });
            })
        );

        render(<Column columnId="column-id-1" columnName="Test Column title" columnIndex={0} />);

        await expect(screen.findByTestId("column-option-btn")).rejects.toThrow();
    });

    it("should display modal when clicked on add task button", async () => {
        render(<Column columnId="column-id-1" columnName="Test Column title" columnIndex={0} />);

        const addTaskElement = await screen.findByTestId("add-task-btn");

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

        await userEvent.click(addTaskElement);

        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should not render add task button when user does not have task create permission", async () => {
        server.use(
            http.get(apiURl(permissionURL.userBoardRole("*", "*")), () => {
                return HttpResponse.json({
                    permissions: [
                        Permissions.TASK_DELETE,
                        Permissions.TASK_MOVE,
                        Permissions.COLUMN_CREATE,
                        Permissions.COLUMN_MOVE,
                    ],
                    role: "ADMIN",
                });
            })
        );

        render(<Column columnId="column-id-1" columnName="Test Column title" columnIndex={0} />);

        await expect(screen.findByTestId("column-option-btn")).rejects.toThrow();
    });
});
