import React from "react";

import { ReactComponent as PersonMountains } from "@/assets/images/drawkit-nature-man-colour.svg";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import "./BoardErrorPage.scss";

const BoardErrorPage: React.FC = () => {
  const error = useRouteError();

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
          <p className="error-page__reason-phrase">You are forbinned</p>
        )}
      </div>
    </div>
  );
};

export default BoardErrorPage;
