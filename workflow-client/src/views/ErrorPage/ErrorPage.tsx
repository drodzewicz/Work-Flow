import React from "react";

import { ReactComponent as PersonMountains } from "@/assets/images/drawkit-nature-man-colour.svg";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import "./ErrorPage.scss";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="error-page__wrapper">
      <div className="error-page">
        <PersonMountains className="error-page__image" />
        {isRouteErrorResponse(error) ? (
          <>
            <h2 className="error-page__title">{`ERROR: ${error.status}`}</h2>
            <p className="error-page__reason-phrase">{error.data?.message || error.statusText}</p>
          </>
        ) : (
          <p className="error-page__reason-phrase">Something went wrong</p>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
