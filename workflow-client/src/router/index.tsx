import App from "@/App";
import BoardPage from "@/views/BoardPage";
import BoardSettingsPage from "@/views/BoardSettingsPage";
import DashboardPage from "@/views/DashboardPage";
import ErrorPage from "@/views/ErrorPage";
import RegisterPage from "@/views/RegisterPage";
import WelcomePage from "@/views/WelcomePage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "board/:id",
        element: <BoardPage />,
      },
      {
        path: "board/:id/settings",
        element: <BoardSettingsPage />,
      },
    ],
  },
]);

export default router;
