import App from "@/App";
import BoardPage from "@/views/BoardPage";
import DashboardPage from "@/views/DashboardPage";
import ErrorPage from "@/views/ErrorPage";
import Register from "@/views/Register";
import WelcomePage from "@/views/WelcomePage";
import BoardSettings from "@/views/BoardSettings";
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
        element: <Register />,
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
        element: <BoardSettings />,
      },
    ],
  },
]);

export default router;
