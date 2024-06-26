import { waitFor } from "@testing-library/react";
import useRBAC, { Permissions } from "./useRBAC";
import { server } from "@/test/mocks/server";
import * as useAuthHooks from "@/hooks/useAuth";
import {
    ReactQueryWrapper,
    apiURl,
    createRouteWrapper,
    queryClient,
    renderHookWithWrappers,
} from "@/test/utils";
import { HttpResponse, http } from "msw";
import permissionURL from "@/service/permission/url";
import { users } from "@/test/mocks/data";

describe("Test Hook - Role Based Access Controll (RBAC)", () => {
    const RouteWrapper = createRouteWrapper("/board/:id", "/board/someId123");

    const useAuthSpy = vi.spyOn(useAuthHooks, "useAuth");

    useAuthSpy.mockReturnValue({
        user: users[0],
        token: "jwt-token-test",
        login: vi.fn,
        logout: vi.fn,
    });

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const renderHook = renderHookWithWrappers([RouteWrapper, ReactQueryWrapper]);

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

    it("should have access when current user has permission that is required", async () => {
        server.use(
            http.get(apiURl(permissionURL.userBoardRole("*", "*")), () => {
                return HttpResponse.json({
                    permissions: [Permissions.TASK_CREATE],
                    role: "ADMIN",
                });
            })
        );

        const { result } = renderHook(useRBAC, {
            initialProps: { boardId: "test-board", action: Permissions.TASK_CREATE },
        });

        await waitFor(() => expect(result.current.isLoading).toBe(true));

        expect(result.current.hasAccess).toBeTruthy();
    });

    it("should not have access when current user has no permission that is required", async () => {
        server.use(
            http.get(apiURl(permissionURL.userBoardRole("*", "*")), () => {
                return HttpResponse.json({
                    permissions: [Permissions.TASK_DELETE],
                    role: "ADMIN",
                });
            })
        );

        const { result } = renderHook(useRBAC, {
            initialProps: { boardId: "test-board", action: Permissions.TASK_CREATE },
        });

        await waitFor(() => expect(result.current.isLoading).toBe(true));

        expect(result.current.hasAccess).toBeFalsy();
    });
});
