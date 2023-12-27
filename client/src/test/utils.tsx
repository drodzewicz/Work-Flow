import { env } from "@/config/env.config";
import { RenderHookOptions, RenderOptions, render, renderHook } from "@testing-library/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter, RouterProvider, createMemoryRouter } from "react-router-dom";

/** React Router Route
 * use this wrapper when a test requires some data in the URL
 * like a paramter which is used to fetch data or simmilar
 */
const createRouteWrapper = (path: string, curentLocation: string = "/") => {
  const RouteWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const routes = [{ path: path, element: children }];

    const router = createMemoryRouter(routes, {
      initialEntries: [curentLocation],
    });

    return <RouterProvider router={router} />;
  };

  return RouteWrapper;
};

/** React Router Wrapper
 * use this wrapper when a component requires a react-router route provider
 * cases like usage of useNavigate, useLocation, useParams etc...
 * require this wrapper
 */
const BrowerRouterWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

/** React Query Wrapper
 * use this wrapper for component that uses the react query hooks for sending requests
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const ReactQueryWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const onDragEndMock = vi.fn();

/** Drag and Drop Wrapper
 * react-beautiful-dnd package requires to render this provider to be able to use other D&D components
 */
const DragDropWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <DragDropContext onDragEnd={onDragEndMock}>{children}</DragDropContext>
);

/** Droppable Wrapper
 * use this wrapper as a placeholder for rendering Droppable components
 * to render a droppable component react-beautiful-dnd package requires it
 * to be renderend inside of the Droppable provider
 */
const DroppableWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Droppable droppableId="test-droppableId" type="test-type">
    {(provided) => {
      return (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {children}
        </div>
      );
    }}
  </Droppable>
);

/** Wrapper Builder util function
 * takes in an array of wrapper components as a parameter
 * and reduces it to a single wrapper component like
 * @example
 * input: wrappers: [FirstWrapper, SecondWrapper, ThirdWrapper]
 * output:
 * <ThirdWrapper>
 *   <SecondWrapper>
 *     <FirstWrapper>
 *       {children}
 *     </FirstWrapper>
 *   </SecondWrapper>
 * </ThirdWrapper>
 */
const renderWithWrappers =
  (wrappers: React.FC<React.PropsWithChildren>[]) =>
  (ui: React.ReactElement, options?: RenderOptions) => {
    const [FirstWrapper, ...otherWrappers] = wrappers;

    const wrapper: React.FC<React.PropsWithChildren> = ({ children }) =>
      otherWrappers.reduce(
        (accumulator, CurrentComponent) => {
          return <CurrentComponent>{accumulator}</CurrentComponent>;
        },
        <FirstWrapper>{children}</FirstWrapper>,
      );

    return render(ui, { wrapper, ...options });
  };

function renderHookWithWrappers<R = any, P = any>(wrappers: React.FC<React.PropsWithChildren>[]) {
  return (hook: (props: P) => R, options?: RenderHookOptions<any>) => {
    const [FirstWrapper, ...otherWrappers] = wrappers;

    const wrapper: React.FC<React.PropsWithChildren> = ({ children }) =>
      otherWrappers.reduce(
        (accumulator, CurrentComponent) => {
          return <CurrentComponent>{accumulator}</CurrentComponent>;
        },
        <FirstWrapper>{children}</FirstWrapper>,
      );

    return renderHook(hook, { wrapper, ...options });
  };
}

const API_URL_BASENAME = [
  `${env.environment === "production" ? "" : env.api.url}`,
  env.api.prefix,
].join("/");

const SOCKET_URL_BASENAME = `${env.environment === "production" ? "" : env.api.url}`;

const apiURl = (path: string) => API_URL_BASENAME + path;
const socketURl = (path: string) => SOCKET_URL_BASENAME + path;

export {
  renderHookWithWrappers,
  renderWithWrappers,
  createRouteWrapper,
  BrowerRouterWrapper,
  ReactQueryWrapper,
  DragDropWrapper,
  DroppableWrapper,
  onDragEndMock,
  queryClient,
  apiURl,
  socketURl,
};
