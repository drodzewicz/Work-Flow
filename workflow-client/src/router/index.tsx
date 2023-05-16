import App, { loader as appLoader } from "@/App";
import BoardPage from "@/views/BoardPage";
import { boardLoader } from "@/views/BoardPage/BoardPage";
import DashboardPage from "@/views/DashboardPage";
import { loader as dashboardLoader } from "@/views/DashboardPage/dataLoader";
import ErrorPage from "@/views/ErrorPage";
import Register from "@/views/Register";
import WelcomePage from "@/views/WelcomePage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: appLoader,
    action: () => 1,
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
        loader: dashboardLoader,
        element: <DashboardPage />,
      },
      {
        path: "board/:id",
        loader: boardLoader,
        element: <BoardPage />,
      },
    ],
  },
]);

export default router;
