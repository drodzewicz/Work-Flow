import { RenderOptions, render } from "@testing-library/react";
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

export { renderWithWrappers, BrowerRouterWrapper, ReactQueryWrapper };
