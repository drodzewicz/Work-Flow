import { render, screen } from "@testing-library/react";
import Notification from "./Notification";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const testNotification: BoardNotification = {
  _id: "id",
  description: "test description",
  title: "test title",
  key: "test-key",
  attributes: { one: "one-attr", two: "two-attr" },
  timeStamp: new Date(),
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </BrowserRouter>
);

describe("Test Component - Notification", () => {
  it("should display title and message", () => {
    render(<Notification notification={testNotification} />, { wrapper });

    const notificationTitle = screen.getByRole("heading", { name: testNotification.title });
    const notificationMessage = screen.getByText(testNotification.description);

    expect(notificationTitle).toBeInTheDocument();
    expect(notificationMessage).toBeInTheDocument();
  });

  // FIXME having trouble with not.toBeVisible()
  // maybe upon rendering the compoenent a sudo cursor is already hovering ove rthe component?
  it.skip("should not display close button", () => {
    render(<Notification notification={testNotification} />, { wrapper });

    const closeButton = screen.queryByRole("button", { name: "close" });

    expect(closeButton).not.toBeVisible();
  });
});
