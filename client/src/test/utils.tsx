import { RenderOptions, render } from "@testing-library/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const BrowerRouterWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

const ReactQueryWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const onDragEndMock = vi.fn();

const DragDropWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <DragDropContext onDragEnd={onDragEndMock}>{children}</DragDropContext>
);

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

export {
  renderWithWrappers,
  BrowerRouterWrapper,
  ReactQueryWrapper,
  DragDropWrapper,
  DroppableWrapper,
  onDragEndMock,
};
