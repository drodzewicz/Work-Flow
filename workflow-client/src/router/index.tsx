import App from "@/App";
import BoardErrorPage from "@/views/BoardErrorPage/BoardErrorPage";
import BoardPage from "@/views/BoardPage";
import BoardSettingsPage from "@/views/BoardSettingsPage";
import DashboardPage from "@/views/DashboardPage";
import ErrorPage from "@/views/ErrorPage";
import ProfilePage from "@/views/ProfilePage";
import RegisterPage from "@/views/RegisterPage";
import TaskDisplayPage from "@/views/TaskDisplayPage";
import WelcomePage from "@/views/WelcomePage";
import { createBrowserRouter } from "react-router-dom";

import RouteGuard from "./RouteGuard";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RouteGuard anonymous redirectTo="/dashboard" />,
        children: [
          {
            path: "/",
            element: <WelcomePage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        element: <RouteGuard redirectTo="/#login" />,
        errorElement: <BoardErrorPage />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "board/:id",
            element: <BoardPage />,
            children: [
              {
                path: "task/:taskId",
                element: <TaskDisplayPage />,
              },
            ],
          },
          {
            path: "board/:id/settings",
            element: <BoardSettingsPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
