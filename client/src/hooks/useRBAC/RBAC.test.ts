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

describe("Test Hook - Role Based Access Controll (RBAC)", () => {
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
      }),
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
      }),
    );

    const { result } = renderHook(useRBAC, {
      initialProps: { boardId: "test-board", action: Permissions.TASK_CREATE },
    });

    await waitFor(() => expect(result.current.isLoading).toBe(true));

    expect(result.current.hasAccess).toBeFalsy();
  });
});
