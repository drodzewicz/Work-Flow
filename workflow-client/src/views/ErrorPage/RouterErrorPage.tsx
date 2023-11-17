import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import ErrorPage from "./ErrorPage";

const RouterErrorPage = () => {
  const error = useRouteError();

  const status = isRouteErrorResponse(error) ? error.status : 400;
  const message = isRouteErrorResponse(error) ? error.data?.message : "Something went wrong";

  return <ErrorPage status={status} message={message} />;
};

export default RouterErrorPage;
