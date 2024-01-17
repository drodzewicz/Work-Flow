import { screen } from "@testing-library/react";
import Notification from "./Notification";
import { BrowerRouterWrapper, ReactQueryWrapper, renderWithWrappers } from "@/test/utils";
import { notifications } from "@/test/mocks/data";

const testNotification = notifications[0];

describe("Test Component - Notification", () => {
  const render = renderWithWrappers([BrowerRouterWrapper, ReactQueryWrapper]);

  it("should display title and message", () => {
    render(<Notification notification={testNotification} />);

    const notificationTitle = screen.getByRole("heading", { name: testNotification.title });
    const notificationMessage = screen.getByText(testNotification.description);

    expect(notificationTitle).toBeInTheDocument();
    expect(notificationMessage).toBeInTheDocument();
  });

  // FIXME having trouble with not.toBeVisible()
  // maybe upon rendering the compoenent a sudo cursor is already hovering ove rthe component?
  it.skip("should not display close button", () => {
    render(<Notification notification={testNotification} />);

    const closeButton = screen.queryByRole("button", { name: "close" });

    expect(closeButton).not.toBeVisible();
  });
});
